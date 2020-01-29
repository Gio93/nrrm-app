import './Ripple.css'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
        IonPage, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonItemDivider, IonIcon, IonSegment, IonSegmentButton, IonBackButton, IonInput, IonNote, IonProgressBar
        } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import API from '../utils/httpUtils';
import { RippleInfo, TextDto, RoleableDto, RolDto } from '../declarations';


type Props = { props:any };

type RippleDetail = {
    values:Array<any>
}

type KeyAndValue = {
    key : string,
    value? : string,
    numberValue? : number
}

const RipplePage: React.FC<Props & RouteComponentProps<any>> = (Params) => {
    const [data, setData] = useState<RippleInfo>();
    const [selectedRippleId, setSelectedRippleId] = useState(Params.match.params.ripple);

    const SECTIONS:Array<string> = ["AS-IS","Solution","Challenge","Value","Benefits","Ripple Information","Exponential Technologies","Roles", "Numbers", "Complexity"];

    const myapi = new API(Params);


    useEffect(() => {
        console.log("useEffect");
        myapi.doGet("/nrrm-ripple/ripple/findOne/"+selectedRippleId).then(data => {
          return setData(data);
        });

        // async function loadData() {
        // const loadedData = await getDataFromAPI();
        //   setData(loadedData);
        // }
        // console.log("selectedCard :: "+data);
        // //if(!data){
        //   loadData();
        // //}
        
    }, []);  

    const getText=(key:string)=>{
      if(!data)return;
      let dd = data.texts.find((x:TextDto)=>x.type.toUpperCase().indexOf(key)!==-1 );
      if(!!dd) return dd.text;
      else return ""
    }

    const getRippleInfoItems=()=>{
      let temp:Array<KeyAndValue> = [];
      temp.push({key:"Ripple Owner",value:data.rippleOwner});
      temp.push({key:"Type of Solution",value:data.type.rippleType});
      temp.push({key:"Type of Implementation",value:data.implementationType.implementationType});
      temp.push({key:"Business Area",value:data.businessArea.businessArea});
      return temp;
    }

    const getNumbersItems=()=>{
      let temp:Array<KeyAndValue> = [];
      temp.push({key:"P/L Impact Range (k€)",value:data.plImpactRangeLower + " - " +data.plImpactRangeHigher});
      temp.push({key:"Cost Range (k€)",value:data.costRangeLower + " - " +data.costRangeHigher});
      temp.push({key:"Time Range (weeks)",value:data.timeRangeLower + " - " +data.timeRangeHigher});
      return temp;
    }

    const getComplexityItems=()=>{
      let temp:Array<KeyAndValue> = [];
      temp.push({key:"Complexity ("+data.complexityPercentage+"%)",numberValue:parseFloat(data.complexityPercentage as any)/100});
      temp.push({key:"Impact ("+data.impactPercentage+"%)",numberValue:parseFloat(data.impactPercentage as any)/100});
      return temp;
    }

    const getItemsForSection=(section:string)=>{
     if (!data) return; 

      switch(section){
        case "AS-IS":
          return <IonItem key="asis0" className="asis"><IonInput disabled>{getText("AS-IS")}</IonInput><IonNote slot="end"></IonNote></IonItem>;
        case "Solution":
          return <IonItem key="solution0" className="solution"><IonInput disabled>{getText("SOLUTION")}</IonInput><IonNote slot="end"></IonNote></IonItem>;
        case "Challenge":
          return <IonItem key="challenge0" className="challenge"><IonInput disabled>{getText("CHALLENGE")}</IonInput><IonNote slot="end"></IonNote></IonItem>;
        case "Value":
          return <IonItem key="value0" className="value"><IonInput disabled>{getText("VALUE")}</IonInput><IonNote slot="end"></IonNote></IonItem>;
        case "Benefits":
          return <IonItem key="benefits0" className="benefits"><IonInput disabled>{getText("BENEFITS")}</IonInput><IonNote slot="end"></IonNote></IonItem>;
        case "Ripple Information":
          return getRippleInfoItems().map((x,i)=>{
            return (<IonItem key={"ri"+i} className="ri"><IonLabel position="stacked">{x.key}</IonLabel><IonInput disabled>{x.value}</IonInput><IonNote slot="end"></IonNote></IonItem>);
          });
        case "Exponential Technologies":
          return data.technologiesInvolved.map((x,i)=>{
            return <IonItem key={"ti"+i} className="ti"><IonLabel position="stacked">{x.technologiesType}</IonLabel><IonNote slot="end"></IonNote></IonItem>;
          });
        case "Roles":
          return data.rippleRoleables.map((x,i)=>{
            return (<IonItem key={"com"+i} className="rr"><IonLabel position="stacked">{x.rol.rolType+" ("+x.percentage+"%)"}</IonLabel><IonProgressBar value={(x.percentage)/100}></IonProgressBar></IonItem>);
          });
        case "Numbers":
          return getNumbersItems().map((x,i)=>{
            return (<IonItem key={"num"+i} className="num"><IonLabel position="stacked">{x.key}</IonLabel><IonInput disabled>{x.value}</IonInput><IonNote slot="end"></IonNote></IonItem>);
          });
        case "Complexity":
          return getComplexityItems().map((x,i)=>{
            let color = (x.numberValue > 0.7) ? "success" : (x.numberValue > 0.4) ? "warning" : "danger";  
            return (<IonItem key={"com"+i} className="ri"><IonLabel position="stacked">{x.key}</IonLabel><IonProgressBar value={x.numberValue} color={color}></IonProgressBar></IonItem>);
          });
      }
    }

    return (
        <IonPage>
            <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonMenuButton /> */}
            <IonBackButton  defaultHref="/ripple/"/>
          </IonButtons>
          <IonTitle>Ripple Details</IonTitle>
        </IonToolbar>
        <IonToolbar className="rippleSegmentCustom">
      <IonSegment  key="ionsegmentKey" scrollable onIonChange={e => {
          console.log('Segment selected', e.detail.value);
          let content:HTMLIonContentElement = document.querySelector('ion-content.customContent22');
          debugger;
          let divider:HTMLObjectElement=document.querySelector("ion-item-divider."+e.detail.value);
          let parent:any = divider.offsetParent;
          if(content!=null && divider!=null)content.scrollToPoint(100,parent.offsetTop-divider.clientHeight,1500);

          // switch(e.detail.value){
          //     case 'part1':
          //           let divider1:HTMLObjectElement=document.querySelector("ion-item.part1")
          //           if(content!=null)content.scrollToPoint(100,divider1.offsetTop-divider1.clientHeight,1500);
          //         break;
          //     case 'part2':
          //           let divider2:HTMLObjectElement=document.querySelector("ion-item.part2")
          //           if(content!=null)content.scrollToPoint(100,divider2.offsetTop-divider2.clientHeight,1500);
          //         break;
          //     case 'part3':
          //           let divider3:HTMLObjectElement=document.querySelector("ion-item.part3")
          //           if(content!=null)content.scrollToPoint(100,divider3.offsetTop-divider3.clientHeight,1500);
          //         break;
          // }
          
          }}>
          {SECTIONS.map((x,i)=>{
            let part="part"+i;

            return <IonSegmentButton key={i} value={part}>
                    {/* <IonIcon name="camera"/> */}
                    <IonLabel key={i}>{x}</IonLabel>
                  </IonSegmentButton>})
          }
        {/* <IonSegmentButton value="part1">
          <IonIcon name="camera" />
          <IonLabel>GENERAL</IonLabel>
        </IonSegmentButton> */}
        {/* <IonSegmentButton value="part2">
          <IonIcon name="bookmark" />
          <IonLabel>Section2</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="part3">
          <IonIcon name="bookmark" />
          <IonLabel>Section3</IonLabel>
        </IonSegmentButton> */}
      </IonSegment>
    </IonToolbar>
      </IonHeader>

      <IonContent
        scrollEvents={true} 
        onIonScrollStart={() => {}}
        onIonScroll={(e) => {console.log(e)}}
        onIonScrollEnd={() => {}}
        className="customContent22 rippleDetail">

            {SECTIONS.map((x,i)=>{
              let items = getItemsForSection(x);
              let part="part"+i;
            return <IonList><IonItemDivider sticky className={part}>{x}</IonItemDivider>{items}</IonList>;
            })}
            {/* {keysAndValues.map((x:KeyAndValue) => {
              return <IonItem key={x.key} className="part1"><IonLabel position="stacked">{x.key}</IonLabel><IonInput disabled>{x.value}</IonInput><IonNote slot="end"></IonNote></IonItem>})} */}
            {/* <IonItemDivider sticky >Section 2</IonItemDivider>
            {data.values.map(x => <IonItem key={x.id} className="part2"><IonLabel position="stacked">{x}</IonLabel><IonInput disabled>value</IonInput><IonNote slot="end">On</IonNote></IonItem>)}
            <IonItemDivider sticky >Section 3</IonItemDivider>
            {data.values.map(x => <IonItem key={x.id} className="part3"><IonLabel position="stacked">{x}</IonLabel><IonInput disabled>value</IonInput><IonNote slot="end">On</IonNote></IonItem>)} */}
            
      </IonContent>
    </IonPage>
    );
};

export default RipplePage;
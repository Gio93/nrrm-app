import { IonButtons,IonLoading, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonFabList, IonGrid, IonRow, IonCol, IonSearchbar, IonModal, IonButton, IonLabel, IonChip } from '@ionic/react';
import {  stats, funnel, business, desktop, trophy  } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import './Ripples.css';
import Card from '../components/Card';
import {RippleInfo,Filter} from '../declarations';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import  '../utils/httpUtils';
import API from '../utils/httpUtils';
import {getColorForType} from '../theme/colorfcns';

type Props = { props:any };

const ListPage: React.FC<Props & RouteComponentProps<any>> = (params) => {
  
  // const generateData = (value:any, length = 5) =>
  //     d3.range(length).map((item, index) => ({
  //       date: index,
  //       value: value === null || value === undefined ? Math.random() * 100 : value
  //     })
  //   );

  const [aFilters, setFilters] = useState([]);

  const [aImplementationTypes, setImplementationTypes] = useState([]);
  const [aTypes, setTypes] = useState([]);
  const [aBusinessAreas, setBusinessAreas] = useState([]);


  const [showLoading, setShowLoading] = useState(true);
  const [showModalImplementationType, setShowModalImplementationType] = useState(false);
  const [showModalType, setShowModalType] = useState(false);
  const [showModalBusinessArea, setShowModalBusinessArea] = useState(false);
  const [data, setData] = useState<Array<RippleInfo>>(null);
  const myapi = new API(params);
  // const changeData = () => {
  //   setData(generateData);
  // };

  const loadData=()=>{
      setShowLoading(true);
      // myapi.doGetwithRippleFilterCard("/nrrm-ripple/ripple?email=" + localStorage.getItem('email')).then(data => {
      myapi.doGet("/nrrm-ripple/ripple/getFilters?email=" + localStorage.getItem('email') + '&only_cards=true').then(data=>{
        setShowLoading(false);
        if(!data) return setData([]); 
        let aImp:Array<Filter>=[];
        let aTypes:Array<Filter>=[];
        let aBusinessAreas:Array<Filter>=[];
        data.forEach( (element:RippleInfo) => {
          aImp.push({key:element.implementationType.uuid,value:element.implementationType.implementationType,type:0});
          aTypes.push({key:element.type.uuid,value:element.type.rippleType,type:1});
          aBusinessAreas.push({key:element.businessArea.uuid,value:element.businessArea.businessArea,type:2});
        });
        setImplementationTypes(uniqueValues(aImp));
        setTypes(uniqueValues(aTypes));
        setBusinessAreas(uniqueValues(aBusinessAreas));
        return setData(data);
      });
    }

    const uniqueValues=(aArray:Array<any>)=>{
      return aArray.filter((thing, index, self) => self.findIndex(t => t.place === thing.place && t.key === thing.key) === index);
    }

    const loadFilteredData=(text:string)=>{
      setShowLoading(true);
      let tempData=data.filter((x)=>{
        return (x.smallDescription.toUpperCase().indexOf(text.toUpperCase())!==-1)
      });
      setShowLoading(false);
      return setData(tempData);
      
    }

  useEffect(() => {
    loadData();
  },[]);

  const loadAdvancedFilteredData=()=>{
    setShowLoading(true);
    let sfilters = aFilters.reduce((acc,current)=>{
      if(current.type===0){
        return acc+"&implementationType="+current.key;
      }else if(current.type===1){
        return acc+"&type="+current.key;
      }else if(current.type===2){
        return acc+"&businessArea="+current.key;
      }else return "";
    },"");
    let terminationUrl = sfilters.length > 0 ? sfilters + "&only_cards=true" : "&only_cards=true"
    // myapi.doGet("/nrrm-ripple/ripple/getFilters?"+terminationUrl).then(data=>{
      myapi.doGet("/nrrm-ripple/ripple/getFilters?" + terminationUrl + '&email=' + localStorage.getItem('email')).then(data=>{
      setShowLoading(false);
      return setData(data);
    });
  }

  const resetFilter = (selectedFilter:Filter)=>{
    
    aFilters.splice(aFilters.indexOf(selectedFilter),1);
    let tmp=aFilters.slice();
    setFilters(tmp);
    loadAdvancedFilteredData();
  };

  const addFilters = (selectedFilter:Filter)=>{

    let index = aFilters.findIndex((a)=>a.type===selectedFilter.type);
    if(index>-1) aFilters.splice(index,1);
    
    if(aFilters.indexOf(selectedFilter)===-1){
      aFilters.push(selectedFilter);
      setFilters(aFilters);
      loadAdvancedFilteredData();
    }
    
  };
 

  const onSearch = (e:any)=>{
    let textdata = e.currentTarget.value
    if(textdata.length>0){
      //search
      loadFilteredData(textdata);
    }else{
      //reset
      loadData();
    }
  };

  const ListItems = (data: any[] & any) => {
    let history2 = useHistory();
    if(!data.data) return <IonList></IonList>;
      
    const items = data.data.map((x:RippleInfo) => {
      const navigateToDetail = () => {
        history2.push("/ripple/"+x.uuid);
      }
  
      return (
        <IonCol size="12" size-sm="6" size-lg="4" size-xl="3" key={x.id}>
  
          <Card cardId={x.id} 
            title={x.name}
            description={x.smallDescription} 
            technologies={x.technologiesInvolved} 
            types={[x.type]} 
            colorHandler={getColorForType.bind(null)}
            implementationType={[x.implementationType]}
            owner={x.rippleOwner}
            progress={x.progressDegree}
            onClick={navigateToDetail} 
          ></Card>
  
        </IonCol>
      );
    });
    return <IonGrid>
      <IonRow className="ion-align-items-stretch">
        {items}
      </IonRow>
    </IonGrid>;
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ripple List</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
          duration={5000}
        />
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonSearchbar id="searchInput" animated onIonChange={onSearch} debounce={400}></IonSearchbar>
            </IonCol>
          </IonRow>
        </IonGrid>

        { aFilters.map(a => {
          return <IonChip 
            onClick={() => {
              resetFilter(a);
            }}
          >
            <IonLabel>{a.value}</IonLabel>
            <IonIcon name="close-circle" /></IonChip>
        })}
        <ListItems data = {data}/>
        <div className="customStackedButtons">
          <IonFab vertical="bottom" horizontal="end" slot="fixed" >
            <IonFabButton routerLink="/rippleDiagram">
              <IonIcon icon={stats} color="light"/>
            </IonFabButton> 
          </IonFab> 
          <IonFab vertical="bottom" horizontal="end" slot="fixed" className="secondaryFab" >
            <IonFabButton color="secondary">
              <IonIcon icon={funnel} color="light"/>
            </IonFabButton> 
            <IonFabList side="top">
              <IonFabButton 
                title="Implementation Type" 
                onClick={(e) => {
                  setShowModalImplementationType(true);
                }}
              >
                <IonIcon icon={trophy} />
              </IonFabButton>
              <IonFabButton 
                title="Solution Type" 
                onClick={(e) => {
                  setShowModalType(true);
                }}
              >
                <IonIcon icon={desktop} />
              </IonFabButton>
              <IonFabButton 
                title="Business Area" 
                onClick={(e) => {    
                  setShowModalBusinessArea(true);
                }}
              >
                <IonIcon icon={business} />
              </IonFabButton>
            </IonFabList>
          </IonFab>
        </div>
        <IonModal isOpen={showModalImplementationType}>
          <IonList>
            { aImplementationTypes.map(a =>
              <IonItem key={a.key} 
                onClick={(e) => {
                  addFilters(a);
                  setShowModalImplementationType(false);
                }}
              >
                {a.value}
              </IonItem>)}
          </IonList>
          <IonButton 
            onClick={() => setShowModalImplementationType(false)}
          >
            Cerrar
          </IonButton>
        </IonModal>
        <IonModal isOpen={showModalType}>
          <IonList>
            { aTypes.map(a => 
              <IonItem 
                key={a.key} 
                onClick={(e) => {
                  addFilters(a);
                  setShowModalType(false);
                }}
              >
                {a.value}
              </IonItem>)}
          </IonList>
          <IonButton 
            onClick={() => setShowModalType(false)}
          >
            Cerrar
          </IonButton>
        </IonModal>
        <IonModal isOpen={showModalBusinessArea}>
          <IonList>
            { aBusinessAreas.map(a =>
              <IonItem 
                key={a.key} 
                onClick={(e) => {
                  addFilters(a);
                  setShowModalBusinessArea(false);
                }}
              >
                {a.value}
              </IonItem>)}
          </IonList>
          <IonButton onClick={() => setShowModalBusinessArea(false)}>Cerrar</IonButton>
        </IonModal>
        
      </IonContent>
    </IonPage>
  );
};
export default ListPage;

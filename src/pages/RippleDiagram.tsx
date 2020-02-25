import './RippleDiagram.css'
import './RippleDiagramAnims.css'
import React, { useState, useEffect } from 'react';
import { 
        IonPage, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonLoading, IonCol, IonRow, IonFab, IonFabButton, IonMenuButton, IonFabList, IonModal, IonButton, IonChip
        } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import API from '../utils/httpUtils';
import  RippleRoadDiagram  from "../components/RippleRoadDiagram";
import { RippleDiagramNode, Filter, searchableRippleInfo } from '../declarations';
import {  list, funnel, business, desktop, trophy } from 'ionicons/icons';

type Props = { props:any };

type RippleDetail = {
    values:Array<any>
}

type KeyAndValue = {
    key : string,
    value? : string,
    numberValue? : number
}

const RippleDiagramPage: React.FC<Props & RouteComponentProps<any>> = (Params) => {
    
  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [aFilters, setFilters] = useState([]);
  const [aImplementationTypes, setImplementationTypes] = useState([]);
  const [aTypes, setTypes] = useState([]);
  const [aBusinessAreas, setBusinessAreas] = useState([]);
  const [showModalImplementationType, setShowModalImplementationType] = useState(false);
  const [showModalType, setShowModalType] = useState(false);
  const [showModalBusinessArea, setShowModalBusinessArea] = useState(false);

  const [data, setData] = useState<Array<RippleDiagramNode>>(null);
  console.log("RippleDiagramPage");

    const loadData=()=>{
      setShowLoading(true);
      myapi.doGet("/nrrm-ripple/ripple").then(data => {
        setShowLoading(false);
        setFilterData(data);
        //debugger;
        return flatterDataSet(data);
      });
    }

    const setFilterData=(data: searchableRippleInfo[])=>{
      if(!data) return setData([]); 
        let aImp:Array<Filter>=[];
        let aTypes:Array<Filter>=[];
        let aBusinessAreas:Array<Filter>=[];
        data.forEach( (element:searchableRippleInfo) => {
          aImp.push({key:element.implementationType.uuid,value:element.implementationType.implementationType,type:0});
          aTypes.push({key:element.type.uuid,value:element.type.rippleType,type:1});
          aBusinessAreas.push({key:element.businessArea.uuid,value:element.businessArea.businessArea,type:2});
        });
        setImplementationTypes(uniqueValues(aImp));
        setTypes(uniqueValues(aTypes));
        setBusinessAreas(uniqueValues(aBusinessAreas));
    }

    const uniqueValues=(aArray:Array<any>)=>{
      return aArray.filter((thing, index, self) => self.findIndex(t => t.place === thing.place && t.key === thing.key) === index);
    }

    const loadAdvancedFilteredData=()=>{
        setShowLoading(true);
        if(!data)return;
        //debugger;
        data.forEach((singleData)=>{
          if(aFilters.length===0) {
            singleData.highlighted=false;
            return;
          }
          aFilters.forEach((filter:Filter)=>{
            if( filter.type === 0  && singleData.implementationTypeUUID === filter.key) { //implementation type
              singleData.highlighted = true;
            }else if ( filter.type === 1 && singleData.typeUUID === filter.key){ // Type
              singleData.highlighted = true;
            }else if ( filter.type === 2 && singleData.businessAreaUUID === filter.key){ // businessArea
              singleData.highlighted = true;
            }else{
              singleData.highlighted=false;
            }
            
          });
        });
        setData(data);
        setShowLoading(false);
        return ;


    }

    const resetFilter = (selectedFilter:Filter)=>{
    
      aFilters.splice(aFilters.indexOf(selectedFilter),1);
      let tmp=aFilters.slice();
      setFilters(tmp);
      loadAdvancedFilteredData();
    };
  
    const addFilters = (selectedFilter:Filter)=>{
      
      if(aFilters.indexOf(selectedFilter)===-1){
        aFilters.push(selectedFilter);
        setFilters(aFilters);
        loadAdvancedFilteredData();
      }
      
    };

    const flatterDataSet = (data:Array<searchableRippleInfo>)=>{
      if(!data) return;
      let flatData:Array<RippleDiagramNode> = [
        {
          id:0,
          name:"Inicio",
          smallDescription:"",
          father:undefined,
          type:0,
          isOpened:true,
          hasChildren: true,
          highlighted : false,
          typeUUID:"",
          implementationTypeUUID:"",
          businessAreaUUID:""
        }
      ];
      for(let i=0;i<data.length;i++){
        flatData.push({
          id:data[i].id,
          name:data[i].name,
          smallDescription:data[i].smallDescription,
          father: (data[i].predecessor)?data[i].predecessor.id : 0,
          type: (data[i].type)?data[i].type.id : 0,
          isOpened:true,
          hasChildren: !data.find((e)=>e.id === ((data[i].predecessor)?data[i].predecessor.id:0)),
          highlighted:!!data[i].selected,
          typeUUID:data[i].type.uuid,
          implementationTypeUUID:data[i].implementationType.uuid,
          businessAreaUUID:data[i].businessArea.uuid
        });
      }
      setData(flatData.sort((a,b)=>a.id-b.id));

    }

    const onClickNode = (node : RippleDiagramNode)=>{
      // var buttonId = "six";
      // document.querySelector('#modal-container').removeAttr('class').addClass(buttonId);
      // document.querySelector('body').addClass('modal-active');
      setAnimate(!animate);
    }

    useEffect(() => {
      loadData();
    }, []);  

    return (
        <IonPage>
          <IonHeader>
            
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Ripple Road Diagram</IonTitle>
            </IonToolbar>

          </IonHeader>
          <IonContent>

            <div className="chips-wrapper">
              {aFilters.map((a) => {
                return <IonChip onClick={()=>{resetFilter(a);}}>
                  <IonLabel>{a.value}</IonLabel>
                  <IonIcon name="close-circle" />
                </IonChip>
              })}
            </div>
            <IonLoading
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Loading...'}
              duration={3000}
            />
            <div className="ripple-diagram-wrapper">
              <RippleRoadDiagram onClickNode={(a:RippleDiagramNode) => onClickNode(a)}
                data={data}
              />
            </div>
            <div className="legend">
              <IonRow>
                <IonCol size="auto">
                  <div className='legend__item legend__item--one'></div>
                </IonCol>
                <IonCol size="auto">
                  <span>Backbone</span> 
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="auto">
                  <div className='legend__item legend__item--two'></div>
                </IonCol>
                <IonCol size="auto">
                  <span>Nimbl System Integration</span> 
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="auto">
                  <div className='legend__item legend__item--three'></div>
                </IonCol>
                <IonCol size="auto">
                  <span>Nimbl Digital Asset</span> 
                </IonCol>
              </IonRow>
            </div>
            <div className="customStackedButtons">
              <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                <IonFabButton routerLink="/ripple">
                  <IonIcon icon={list} color="light"/>
                </IonFabButton> 
              </IonFab> 
              <IonFab vertical="bottom" horizontal="end" slot="fixed" className="secondaryFab" >
                <IonFabButton color="secondary">
                  <IonIcon icon={funnel} color="light"/>
                </IonFabButton> 
                <IonFabList side="top">
                  <IonFabButton title="Implementation Type" onClick={(e)=>{setShowModalImplementationType(true);}}>
                    <IonIcon icon={trophy} />
                  </IonFabButton>
                  <IonFabButton title="Solution Type" onClick={(e)=>{setShowModalType(true);}}>
                    <IonIcon icon={desktop} />
                  </IonFabButton>
                  <IonFabButton title="Business Area" onClick={(e)=>{setShowModalBusinessArea(true);}}>
                    <IonIcon icon={business} />
                  </IonFabButton>
                </IonFabList>
              </IonFab>
            </div>
            <IonModal isOpen={showModalImplementationType}>
              <IonList>
                {aImplementationTypes.map((a) => 
                  <IonItem key={a.key} onClick={(e) => {
                    addFilters(a);
                    setShowModalImplementationType(false);
                  }}>
                    {a.value}
                  </IonItem>
                )}
              </IonList>
              <IonButton onClick={() => setShowModalImplementationType(false)}>Cerrar</IonButton>
            </IonModal>

            <IonModal isOpen={showModalType}>
              <IonList>
                {aTypes.map((a) =>
                  <IonItem key={a.key} onClick={(e)=>{
                    addFilters(a);
                    setShowModalType(false);
                  }}>
                    {a.value}
                  </IonItem>
                )}
              </IonList>
              <IonButton onClick={() => setShowModalType(false)}>Cerrar</IonButton>
            </IonModal>

            <IonModal isOpen={showModalBusinessArea}>
              <IonList>
                {aBusinessAreas.map((a) =>
                  <IonItem key={a.key} onClick={(e)=>{
                    addFilters(a);
                    setShowModalBusinessArea(false);
                  }}>
                    {a.value}
                  </IonItem>
                )}
              </IonList>
              <IonButton onClick={() => setShowModalBusinessArea(false)}>Cerrar</IonButton>
            </IonModal>

          </IonContent>
        </IonPage>
    );
};

export default RippleDiagramPage;
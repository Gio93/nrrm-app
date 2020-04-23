import './RippleDiagram.css'
import './RippleDiagramAnims.css'
import React, { useState, useEffect } from 'react';
import { 
        IonPage, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonIcon, IonLoading, IonCol, IonRow, IonFab, IonFabButton, IonMenuButton, IonFabList, IonModal, IonButton, IonChip
        } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import API from '../utils/httpUtils';
import  RippleRoadDiagram  from "../components/RippleRoadDiagram";
import { RippleDiagramNode, Filter, searchableRippleInfo, FilterAux } from '../declarations';
import {  funnel, business, desktop, trophy, informationCircle } from 'ionicons/icons';
import {getColorForType} from '../theme/colorfcns';

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
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  let [nonRepeatedValues, setNonRepeatValues] = useState([]);
  let [maxLevels, setMaxLevels] = useState<number>(0);
  let auxMaxLevels: number = 0;
  let trackLevels: number = 0;

  const [data, setData] = useState<Array<RippleDiagramNode>>(null);
  const [originData, setOriginData] = useState<Array<any>>(null);

    const loadData=()=>{
      setShowLoading(true);
      myapi.doGet("/nrrm-ripple/ripple?email=" + localStorage.getItem('email')).then(data => {
        setShowLoading(false);
        setFilterData(data);
        setOriginData(data);
        return flatterDataSet(data);
      });
    }

    const callbackFunction = (nodeData:any) => {
      let selectedData = null;
      selectedData = originData.find(node => node.id === nodeData.id);
      setSelectedNodeData(selectedData);
     
}

    const setFilterData=(data: searchableRippleInfo[])=>{
      if(!data) return setData([]); 
        let aImp:Array<Filter>=[];
        let aTypes:Array<FilterAux>=[];
        let aBusinessAreas:Array<Filter>=[];
        
        data.forEach( (element:searchableRippleInfo) => {
          aImp.push({key:element.implementationType.uuid,value:element.implementationType.implementationType,type:0});
          aTypes.push({key:element.type.uuid,value:element.type.rippleType,type:1, typeColor:element.type.id});
          aBusinessAreas.push({key:element.businessArea.uuid,value:element.businessArea.businessArea,type:2});
          setNonRepeatValues (Array.from(new Set(aTypes.map(a => a.key)))
          .map(id => {
            return aTypes.find(a => a.key === id)
          }));
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
        ////debugger;
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
          isSelected: false,
          businessAreaUUID:""
        }
      ];
      for(let i = 0; i < data.length; i++){
        flatData.push({
          id:data[i].id,
          name:data[i].name,
          smallDescription:data[i].smallDescription,
          father: (data[i].predecessor) ? data[i].predecessor.id : 0,
          type: (data[i].type)?data[i].type.id : 0,
          isOpened:true,
          hasChildren: data[i].successor.length > 0 ? true : false,
          highlighted: data[i].selected,
          typeUUID:data[i].type.uuid,
          implementationTypeUUID:data[i].implementationType.uuid,
          isSelected: false,
          businessAreaUUID:data[i].businessArea.uuid
        });
      }


      let lastChildren = data.filter(node => node.successor.length === 0);
      lastChildren.forEach((node) => {
        let levels = 0;
        levels = trackPredecessor(node, data);
        if (trackLevels === 0) {
          auxMaxLevels = trackLevels;
        }
        else {
          if (trackLevels > auxMaxLevels) {
            auxMaxLevels = trackLevels;
          }
        }
        trackLevels = 0;
      });
      auxMaxLevels++;
      setMaxLevels(auxMaxLevels);
      setData(flatData.sort((a,b)=>a.id-b.id));
    }

    function trackPredecessor(node: searchableRippleInfo, data: Array<searchableRippleInfo>): number {
      if (node.predecessor === null) {
        trackLevels++;
        return trackLevels
      }
      else {
        trackLevels++;
        trackPredecessor(data.find(item => item.uuid === node.predecessor.uuid), data);
      }
    }

    const onClickNode = (node : RippleDiagramNode)=>{
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
              <RippleRoadDiagram 
                onClickNode={(a:RippleDiagramNode) => onClickNode(a)}
                data={data} 
                getColorFromParent = {getColorForType.bind(null)} 
                getBorderFromParent = {getColorForType.bind(null)}
                maxLevels = {maxLevels}
                parentCallback = {callbackFunction.bind(null)}
                
              />
            </div>
            <div className="legend">
              
              {nonRepeatedValues.map((element, index) => {
                return <IonRow>
                  <IonCol size="auto">
                    <div  className='legend__item' style={{backgroundColor: getColorForType(element.typeColor), borderColor:getColorForType(element.typeColor) }}></div>
                  </IonCol>
                  <IonCol size="auto">
                    <span>{element.value}</span> 
                  </IonCol>
                </IonRow>
              })}
            </div>
            <div className="customStackedButtons">
            {selectedNodeData !=null ?
                <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                  <IonFabButton routerLink={"/ripple/" + selectedNodeData.uuid}>
                    <IonIcon icon={informationCircle} color="light"/>
                  </IonFabButton> 
                </IonFab> 
                :
                null
              }

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
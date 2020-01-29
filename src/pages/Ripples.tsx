import { IonButtons,IonLoading, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonFabList, IonRippleEffect, IonGrid, IonRow, IonCol, IonSearchbar } from '@ionic/react';
import { beer, build, flask, football, search, stats } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import './Ripples.css';
import Card from '../components/Card';
import {RippleInfo} from '../declarations';
import { CONFIG, COMMAND, Operator } from '../constants';
import { RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import  '../utils/httpUtils';
import API from '../utils/httpUtils';

type Props = { props:any };

const ListPage: React.FC<Props & RouteComponentProps<any>> = (params) => {
  
  // const generateData = (value:any, length = 5) =>
  //     d3.range(length).map((item, index) => ({
  //       date: index,
  //       value: value === null || value === undefined ? Math.random() * 100 : value
  //     })
  //   );
  const [showLoading, setShowLoading] = useState(true);
  const [data, setData] = useState<Array<RippleInfo>>(null);
  const myapi = new API(params);
  // const changeData = () => {
  //   setData(generateData);
  // };

  const loadData=()=>{
      setShowLoading(true);
      myapi.doGet("/nrrm-ripple/ripple").then(data => {
        setShowLoading(false);
        return setData(data);
      });
    }

    const loadFilteredData=(text:string)=>{
      setShowLoading(true);
      let tempData=data.filter((x)=>{
        return (x.smallDescription.toUpperCase().indexOf(text.toUpperCase())!==-1)
      });
      setShowLoading(false);
      return setData(tempData);
      
    }

    // async function loadFilteredData(textToFilter:string) {
    //   const loadedData = await getDataFilteredFromAPI(textToFilter);
    //     console.log(loadedData);
    //     setData(loadedData);
    //   }

  useEffect(() => {
    loadData();
  }, []);

 

  const onSearch = (e:any)=>{
    let textdata = e.currentTarget.value
    console.log(textdata);
    if(textdata.length>0){
      //search
      loadFilteredData(textdata);
    }else{
      //reset
      loadData();
    }
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Ripple Road</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent><IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Loading...'}
        duration={5000}
      />
      <IonSearchbar id="searchInput" animated onIonChange={onSearch} debounce={400}></IonSearchbar>
        <ListItems data = {data}/>
         <IonFab vertical="bottom" horizontal="end" slot="fixed" >
          <IonFabButton routerLink="/rippleDiagram">
            <IonIcon icon={stats} color="light"/>
          </IonFabButton> 

          {/*<IonFabList side="top">
            <IonFabButton><IonIcon icon={flask} /></IonFabButton>
            <IonFabButton><IonIcon icon={beer} /></IonFabButton>
            <IonFabButton><IonIcon icon={football} /></IonFabButton>
          </IonFabList>*/}
        </IonFab> 

      </IonContent>
    </IonPage>
  );
};

const ListItems = (data: any[] & any) => {

  let history2 = useHistory();
  if(!data.data) return <IonList></IonList>;

  console.log(data.data);
  
  const items = data.data.map((x:RippleInfo) => {

    const navigateToDetail = () => {
      console.log("navigate!");
      history2.push("/ripple/"+x.uuid);
    }
    
    return (
      <IonCol size="12" sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="4" sizeXl="3" key={x.id}>
      
        
        <Card cardId={x.id} 
          title={x.name}
          description={x.smallDescription} 
          technologies={x.technologiesInvolved} 
          types={[x.type]} 
          owner={x.rippleOwner}
          progress={x.progressDegree}
          onClick={navigateToDetail} 
          ></Card>
      
      </IonCol>
    );
  });

  return <IonGrid><IonRow>{items}</IonRow></IonGrid>;
};

export default ListPage;

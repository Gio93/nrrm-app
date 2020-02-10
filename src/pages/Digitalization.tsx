import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import DigitalizationChart from '../components/DigitalizationChart'

import API from '../utils/httpUtils';
import { RippleIndicator, RippleIndicatorInfo } from '../declarations';



type Props = { props:any };


//Function Component Definition
const DigitalizationGrade:React.FC<Props & RouteComponentProps<any>> = (Params) => {
  
  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);

  const [data1, setData1] = useState<Array<RippleIndicatorInfo>>(null);
  const [dataOrigen, setDataOrigen] = useState<Array<RippleIndicator>>(null);

  console.log("RippleDiagramIndicators");

    const loadData= async ()=>{
      try{
        setShowLoading(true);
        const response: Array<RippleIndicator> = await myapi.doGet("/nrrm-ripple/indicator");
        indicatorGroups(response);
      }catch (e) {
        console.log(e);
        setData1(null);
      }
      
    }

    // let dataProof = [
    //   {State: "P&L Impact", current: 10, remainder: 90, total: 100},
    //   {State: "Digital Assets", current: 20, remainder: 80, total: 100},
    //   {State: "Customer Experience", current: 30, remainder: 70, total: 100},
    //   {State: "Collaborative Ecosystem", current: 40, remainder: 60, total: 100},
    //   {State: "Data Driven", current: 50, remainder: 50, total: 100},
    //   {State: "Manual Process Automation", current: 60, remainder: 40, total: 100},
    //   {State: "Adoption Grade Cloud Native", current: 70, remainder: 30, total: 100},

    // ]


    const indicatorGroups = (data:Array<RippleIndicator>)=>{
      let CoreData: Array<RippleIndicatorInfo> = [];
      let dataFormat:any;
    
      if(!data) return;
      for(let i=0; i < data.length; i++){
        if(data[i].indicators.length>0){
          CoreData.push({
            State:data[i].alias,
            current: data[i].percentage * 100,
            remainder: 100 - (data[i].percentage * 100),
            total: 100
          });
        }
      }
      console.log('Loaded core data', CoreData);

     dataFormat = [...CoreData];
     dataFormat.columns =["State", "current" ,"remainder"];

    //  dataFormat = [...dataProof];
    //  dataFormat.columns =["State", "current" ,"remainder"];

      setShowLoading(false);
      setData1(dataFormat);
      setDataOrigen(data);
    }






  // https://es.reactjs.org/docs/hooks-reference.html
  // para bindear los objetos con la vista usa el método setState, por ejemplo, 
  // const [showLoading, setShowLoading] = useState(true);
  // esto crea un parametro llamado "showLoading" con un método de seteo "setShowLoading" y por defecto tiene el valor "true"
  // que puedes bindear en el template y que se gestiona con el ciclo de vida de la pantalla

  //hook que se lanza al cargar el componente en pantalla
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
          <IonTitle>Digitalization Grade</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonLoading
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Loading...'}
              duration={5000}
            />
        <DigitalizationChart data={data1} dataOrigen={dataOrigen} />
      </IonContent>
    </IonPage>
  );
};



export default DigitalizationGrade;

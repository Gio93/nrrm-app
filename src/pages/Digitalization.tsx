import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import DigitalizationChart from '../components/DigitalizationChart'

import API from '../utils/httpUtils';
import { RippleIndicator, RippleIndicatorInfo } from '../declarations';



type Props = { props:any };


//Function Component Definition
const DigitalizationGrade:React.FC<Props & RouteComponentProps<any>> = (Params) => {
  debugger;
  

  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);

  const [data1, setData1] = useState<Array<RippleIndicatorInfo>>(null);
  
  console.log("RippleDiagramIndicators");

    const loadData= async ()=>{
      try{
        const response: Array<RippleIndicator> = await myapi.doGet("/nrrm-ripple/indicator");
        indicatorGroups(response);
      }catch (e) {
        console.log(e);
        setData1(null);
      }
      
    }
    // const data01 = [
    //   { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    //   { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    // ];
    // const data02 = [
    //   { name: 'A1', value: 100 },
    //   { name: 'A2', value: 300 },
    //   { name: 'B1', value: 100 },
    //   { name: 'B2', value: 80 },
    //   { name: 'B3', value: 40 },
    //   { name: 'B4', value: 30 },
    //   { name: 'B5', value: 50 },
    //   { name: 'C1', value: 100 },
    //   { name: 'C2', value: 200 },
    //   { name: 'D1', value: 150 },
    //   { name: 'D2', value: 50 },
    // ];

    // let renderLabel = function(entry: any) {
    //   console.log("He entrado",entry);
    //   return entry.name;
    // }

    const indicatorGroups = (data:Array<RippleIndicator>)=>{
      let CoreData: Array<RippleIndicatorInfo> = [];
      let dataFormat:any;
    
      if(!data) return;
      for(let i=0; i < data.length; i++){
        //let isGroup = false;

        // for(let j=0; j < data[i].indicators.length; j++){
        //   isGroup = true;
        //   flatPieBorderData.push({
        //     name:data[i].indicators[j].name,
        //     value: data[i].indicators[j].partialPercentage * 100
        //   });
        // }
        if(data[i].indicators.length>0){
          CoreData.push({
            State:data[i].name,
            current: data[i].percentage * 100,
            remainder: 100 - (data[i].percentage * 100),
            total: 100
          });
        }
        
        // //Indicators groups:
        // if(isGroup){
        //   flatPieCoreData.push({
        //     name:data[i].name,
        //     value: data[i].percentage * 100
        //   });
        // }
      }
      //setData(flatData.sort((a,b)=>a.id-b.id));
      console.log('Loaded core data', CoreData);

      dataFormat = [...CoreData];
      dataFormat.columns =["State", "current" ,"remainder"];
      setData1(dataFormat);
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
        <DigitalizationChart data={data1} />
      </IonContent>
    </IonPage>
  );
};



export default DigitalizationGrade;

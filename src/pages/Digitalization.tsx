import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import  { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

import API from '../utils/httpUtils';
import { RippleIndicator, RippleIndicatorInfoPie } from '../declarations';



type Props = { props:any };


//Function Component Definition
const DigitalizationGrade:React.FC<Props & RouteComponentProps<any>> = (Params) => {
  debugger;
  

  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);

  const [data1, setData1] = useState<Array<RippleIndicatorInfoPie>>(null);
  const [data2, setData2] = useState<Array<RippleIndicatorInfoPie>>(null);
  console.log("RippleDiagramIndicators");

    const loadData=()=>{
      setShowLoading(true);
      myapi.doGet("/nrrm-ripple/indicator").then((data:Array<RippleIndicator>) => {
        setShowLoading(false);
        return indicatorGroups(data);
      });
    }
    const data01 = [
      { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
    ];
    const data02 = [
      { name: 'A1', value: 100 },
      { name: 'A2', value: 300 },
      { name: 'B1', value: 100 },
      { name: 'B2', value: 80 },
      { name: 'B3', value: 40 },
      { name: 'B4', value: 30 },
      { name: 'B5', value: 50 },
      { name: 'C1', value: 100 },
      { name: 'C2', value: 200 },
      { name: 'D1', value: 150 },
      { name: 'D2', value: 50 },
    ];

    let renderLabel = function(entry: any) {
      console.log("He entrado",entry);
      return entry.name;
    }

    const indicatorGroups = (data:Array<RippleIndicator>)=>{
      let flatPieCoreData: Array<RippleIndicatorInfoPie> = [];
      let flatPieBorderData: Array<RippleIndicatorInfoPie> = [];

      if(!data) return;
      debugger;
      for(let i=0; i < data.length; i++){
        let isGroup = false;

        for(let j=0; j < data[i].indicators.length; j++){
          isGroup = true;
          flatPieBorderData.push({
            name:data[i].indicators[j].name,
            value: data[i].indicators[j].partialPercentage * 100
          });
        }
        
        //Indicators groups:
        if(isGroup){
          flatPieCoreData.push({
            name:data[i].name,
            value: data[i].percentage * 100
          });
        }
      }
      //setData(flatData.sort((a,b)=>a.id-b.id));
      console.log('Loaded core data', flatPieCoreData);
      console.log('Loaded border data', flatPieBorderData);
      
      setData1(flatPieCoreData);
      setData2(flatPieBorderData);
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
     <PieChart width={400} height={400}>
        <Pie data={data1} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
        <Pie data={data2} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label={renderLabel} />
      </PieChart>
      <IonContent>
      </IonContent>
    </IonPage>
  );
};



export default DigitalizationGrade;

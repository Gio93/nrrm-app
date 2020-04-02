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

  const loadData = async() => {
    try {
      setShowLoading(true);
      // const response: Array<RippleIndicator> = await myapi.doGet("/nrrm-ripple/indicator");
      const response: Array<RippleIndicator> = await myapi.doGet("/nrrm-ripple/indicator?email=" + localStorage.getItem('email'));
      indicatorGroups(response);
    } catch (e) {
      console.log(e);
      setData1(null);
    }
  }

  const indicatorGroups = (data:Array<RippleIndicator>) => {
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

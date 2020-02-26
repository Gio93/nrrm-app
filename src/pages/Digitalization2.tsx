import { IonButtons, IonContent, IonHeader, IonMenuButton, IonRow, IonPage, IonTitle, IonToolbar,IonItem , IonLoading, IonCard, IonCardSubtitle, IonCardHeader, IonCardContent, IonCardTitle, IonCol } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DigitalizationChart2 from '../components/DigitalizationChart2'
import API from '../utils/httpUtils';
import { RippleIndicator, RippleIndicatorInfo, GraphDataChartBar } from '../declarations';



type Props = { props:any };

//Function Component Definition
const Digitalization2:React.FC<Props & RouteComponentProps<any>> = (Params) => {

  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);

  const [dataOrigen, setDataOrigen] = useState<RippleIndicator>(null);
  const [graphData, setGraphData] = useState<GraphDataChartBar>(null);


    const loadData = async ()=>{
      try{

        setShowLoading(true);

        if(Params.location.state != null && Params.location.state as RippleIndicator){
            
            let indicator = Params.location.state;

            if(indicator.indicators){
              console.log("Inicio de formateo de datos, con variable:", Params.location.state)
        
              let valuesArray:Array<number> = [];
              let numberLabels:Array<string> = [];

              console.log(indicator);
              indicator.indicators.forEach((element:RippleIndicator, index:number) => {
                numberLabels.push((index+1).toString());                
                valuesArray.push(element.percentage*100);
              });

              const graphData: GraphDataChartBar = {        
                labels: numberLabels,
                datasets: [
                  {
                    label: 'Values',
                    data: valuesArray,
                    backgroundColor: [
                      'rgba(128,194,66, 0.7)' 
                    ]
                  }
                ]
                            
            };
            console.log(graphData);
            setGraphData(graphData);
            setDataOrigen(indicator);
          }
        }
      }catch (e) {
        console.log(e);
        
      }   
    }

  useEffect(() => {
    loadData();
 }, [Params,dataOrigen]);


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
          duration={3000}
        />
    <DigitalizationChart2 data={graphData} indicator={dataOrigen}  />
  </IonContent>
</IonPage>
  );
};

export default withRouter(Digitalization2);

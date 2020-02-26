import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonLoading, IonBackButton } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DigitalizationChart2 from '../components/DigitalizationChart2'

import { RippleIndicator, GraphDataChartBar } from '../declarations';



type Props = { props:any };

//Function Component Definition
const Digitalization2:React.FC<Props & RouteComponentProps<any>> = (Params) => {

  
  
  const [showLoading, setShowLoading] = useState(null);

  const [dataOrigen, setDataOrigen] = useState<RippleIndicator>(null);
  const [graphData, setGraphData] = useState<GraphDataChartBar>(null);
  
  const loadData = ()=>{
    try{

      setShowLoading(true);

     // if(Params.location.state != null && Params.location.state as RippleIndicator){
          
          let indicator = Params.location.state;

          if(indicator.indicators){
            console.log("Inicio de formateo de datos, con variable:", indicator)
      
            let valuesArray:Array<number> = [];
            let numberLabels:Array<string> = [];
            let backgroundColors:Array<string> = [];

            indicator.indicators.forEach((element:RippleIndicator, index:number) => {
              // labelsArray.push(element.description);
              numberLabels.push((index+1).toString());
              
              valuesArray.push(element.percentage*100);
              backgroundColors.push('rgba(128,194,66, 0.9)');
              
            });

            const graphData: GraphDataChartBar = {        
              labels: numberLabels,
              datasets: [
                {
                  label: 'Values',
                  data: valuesArray,
                  backgroundColor: backgroundColors
                }
              ]
                          
          };
          setGraphData(graphData);
          setDataOrigen(indicator);
          
        }
      //}
    }catch (e) {
      console.log(e);
      
    }   
  }

  function handlerSpinner(control:boolean){
    setShowLoading(control);
  }

  useEffect(() => {
    handlerSpinner(true);
    console.log("RENDERIZO Digitalization2");
    loadData();
    
 }, []);


  return (
    
  <IonPage>
  <IonHeader>
    <IonToolbar>
    <IonButtons slot="start">
      <IonBackButton  defaultHref="/dgrade/"/>
    </IonButtons>
      <IonTitle>Digitalization Grade</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent>
  <IonLoading
          isOpen={showLoading}
          // onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
          // duration={5000}
        />
    {graphData && dataOrigen? <DigitalizationChart2 data={graphData} indicator={dataOrigen} handlerSpinner={handlerSpinner}  /> : null }
  </IonContent>
</IonPage>
  
  );
};

export default withRouter(Digitalization2);

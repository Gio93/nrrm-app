import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import Chart from "../components/Chart"
import './HistoricPage.css';
import API from '../utils/httpUtils';
import { ChartData } from '../declarations';
import { KeyObject } from 'crypto';
import { ok } from 'assert';
import { values } from 'd3';



interface ChartProps {}
interface ChartState {data:any, spinner: boolean, timeStamp:any, query:any}
 
class HistoricPage extends Component <ChartProps, ChartState>  {

  constructor(props: any) {
    super(props);
    this.state = {
       data: {},
       spinner: true,
       timeStamp : "",
       query: "",
       
    }
  }

  componentDidMount() {
    this.getChartData();
    this.currentDate();
    // this.postData();
  }
  
    // postData = async () => {
    //   const myapi = new API();
    //   const dataThrow : Array<ChartData> = await myapi.doPostwithParams("/nrrm-ripple/grade-history")
    //   try {
    //     this.state.timeStamp;
    //     console.log(dataThrow);
    //   }catch(e){
    //     console.log(e);
    //   }
    // }


   getChartData = async () => {

    const myapi = new API();
    const response : Array<ChartData> = await myapi.doGetwithParams("/nrrm-ripple/grade-history");
    try {
      console.log(response);

      let labelsArray:any = [];
      let valuesArray:any = [];

      response.forEach(element => {
        labelsArray.push(element.timestamp.slice(0,10));
        valuesArray.push(parseFloat(element.totalPercentage));
      });

      const graphData = {
        
          labels: labelsArray,
          datasets: [
            {
              label: 'Values',
              data: valuesArray,
              backgroundColor: [
                'rgba(128,194,66, 0.9)' 
              ]
            }
          ]
         
        
      };

    
      console.log(graphData);
      this.setState({spinner: true, data: graphData });
   
    }catch(e){
      console.log(e);
    }
  }

 
  
  
  currentDate = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
      this.setState({
        ...this.state,
        timeStamp: dateTime,
      })     
      console.log(dateTime);
      console.log(this.state.timeStamp);
      
  }

  render() {

    return (
        
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Historic chart</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className = "chart-content">
          <IonLoading
              isOpen={this.state.spinner}
              onDidDismiss={() => this.setState({spinner:false})}
              message={'Loading...'}
              duration={5000}
            />
          {this.state.data ?
            <Chart
              data={this.state.data} location="Madrid" legendPosition="bottom" 
              /> : null}
          </IonContent>  
        </IonPage>
      

    )
  } 
}
export default HistoricPage;



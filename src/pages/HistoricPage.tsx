import React, { Component } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import Chart from "../components/Chart"
import './HistoricPage.css';
import API from '../utils/httpUtils';
import { ChartData } from '../declarations';


interface ChartProps {}
interface ChartState {data:any, spinner: boolean, timeStamp:any}
 
class HistoricPage extends Component <ChartProps, ChartState>  {

  constructor(props: any) {
    super(props);
    this.state = {
       data: {},
       spinner: true,
       timeStamp : ""
    }
  }

  componentDidMount() {
    this.getChartData();
    this.currentDate();
  }
  

  // Post Call to get the chart Values, we send the timestamp created when the component did  mount

   getChartData = async () => {

    const myapi = new API();
    const response : Array<ChartData> = await myapi.doPostwithParams("/nrrm-ripple/grade-history/getFilterGradesbyYear",
  
    );

    try {
      console.log(response);

      const months = {
        '00': 'ENE',
        '01': 'FEB',
        '02': 'MAR',
        '03': 'ABR',
        '04': 'MAY',
        '05': 'JUN',
        '06': 'JUL',
        '07': 'AGO',
        '08': 'SEP',
        '09': 'OCT',
        '10': 'NOV',
        '11': 'DIC',
      };

      let labelsArray:any = [];
      let valuesArray:any = [];

      response.forEach(element => {
        let auxdate = new Date(element.timestamp);
        let auxmonth = auxdate.getMonth().toString().length == 1 ? '0'+ auxdate.getMonth().toString() : auxdate.getMonth().toString();
        let auxyear = ' ' + auxdate.getFullYear().toString();
        
        labelsArray.push([(months as any)[auxmonth], auxyear]);
        valuesArray.push(Math.round(parseFloat(element.totalPercentage) * 100));
      });

      const graphData = {
        
          labels: labelsArray,
          datasets: [
            {
              label: '% ',
              data: valuesArray,
              backgroundColor: [
                'rgba(128,194,66, 0.7)' 
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
      console.log('Date time', dateTime);
      console.log('State timestamp', this.state.timeStamp);
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



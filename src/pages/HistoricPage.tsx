import React, { Component, useState } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonLabel, IonButton, IonItem } from '@ionic/react';
import Chart from "../components/Chart"
import './HistoricPage.css';
import Axios from 'axios';
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

   getChartData = async () => {
    const myapi = new API();
    
    // const [showLoading, setShowLoading]; 
    const response : Array<ChartData> = await myapi.doGetwithParams("/nrrm-ripple/grade-history");
    try {
      // setShowLoading(true);
      this.setState({spinner: true});
      let ok = response[0].timestamp.slice(0,10);
      let ko = response[0].totalPercentage;
      console.log(response);
      console.log(ok);
      console.log(ko)
    }catch(e){
      console.log(e);
    }
  }
  
  
  currentDate = () => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    console.log(dateTime);
      this.setState({
        ...this.state,
        timeStamp: dateTime,

      })
      
      // console.log(this.state.timeStamp);
        

      
  }

  render() {
    console.log(this.state.timeStamp)
    return (
        <div>
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
          {/* <IonContent>
          
          </IonContent> */}
        </IonPage>
      </div>

    )
  } 
}
export default HistoricPage;



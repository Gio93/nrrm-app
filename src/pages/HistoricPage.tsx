import React, { Component, useState } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonLabel, IonButton, IonItem } from '@ionic/react';
import Chart from "../components/Chart"
import './HistoricPage.css';
import Axios from 'axios';
import API from '../utils/httpUtils';
import { ChartData } from '../declarations';



interface ChartProps {}
interface ChartState {data:any, spinner: boolean}
 
class HistoricPage extends Component <ChartProps, ChartState>  {

  constructor(props: any) {
    super(props);
    this.state = {
       data: {},
       spinner: true
    }
    
  }

  componentDidMount() {
    this.getChartData();
  }

   getChartData = async () => {
    const myapi = new API();
    // const [showLoading, setShowLoading]; 
    const response : Array<ChartData> = await myapi.doGet("/nrrm-ripple/grade-history");
    try {
      // setShowLoading(true);
      this.setState({spinner: true});
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }

  // getChartData = async () => {
  //   const myapi = new API();

  //   let res = await Axios.get("/nrrm-ripple/grade-history")
  //   let { data }  = res.data;
  //   this.setState({ data:res });
  //   console.log(res);
  // };

  render() {
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
        </IonPage>
      </div>

    )
  } 
}
export default HistoricPage;



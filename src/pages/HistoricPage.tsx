import React, { Component, useState } from 'react'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonLabel, IonButton, IonItem } from '@ionic/react';
import Chart from "../components/Chart"
import { RouteComponentProps } from 'react-router';
import { withRouter } from "react-router-dom";


import './HistoricPage.css';

interface ChartProps {}
interface ChartState {data:any}
 
class HistoricPage extends Component <ChartProps, ChartState> {

  constructor(props: any) {
    super(props);
    this.state = {
       data:{}
    }
    
  }

  componentDidMount() {
    this.setState ({
      data: {
        labels: [' D-1', 'D-2', 'D-3', 'D-4', 'D-5', 'D-6', 'D-7','D-8', 'D-9', 'D-10', 'D-11', 'D-12', 'D-13', 'D-14', 'D-15', 'D-16', 'D-17','D-18','D-19','D-20', 'D-21', 'D-22', 'D-23','D-24','D-25','D-26','D-27', 'D-28', 'D-29', 'D-30', 'D-31'],
        datasets: [
          {
            label: 'Values',
            data: [
              77,
              51,
              63,
              89,
              95,
              95, 
              66,
              58,
              78,
              69,
              60,
              95,
              79,
              67,
              77,
              89,
              67,
              77,
              58,
              94,
              95,
              85, 
              66,
              77,
              78,
              69,
              90,
              72,
              59,
              99,
              89,
              99
            ],
            backgroundColor: [
              'rgb(128,194,66)'
            ]
          }
        ]
      }
    })

    
    this.getchartData();
  }

  // formatData(){
  //   let dataF = 
  //   this.setState({data:dataF});
  // }

  

  getchartData() {

    //
    // Axios call goes here.
    //
    
  }
  
 
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



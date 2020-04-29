import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonText, IonCol } from '@ionic/react';
import React, { useEffect, useState, Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import './EffortDiagram.css'
import { Scatter } from 'react-chartjs-2';
import { GraphDataChartScatter } from '../declarations';



type State = { values:any, showAlert: boolean, alerMessage: string};

export class EffortDiagram extends Component<any, State> {
    arr: GraphDataChartScatter;
    values:any

    constructor(props: any) {
        super(props);
        this.state = {
            // data: null,
            // indicator: null,
            showAlert: false,
            alerMessage: "",
            values:null
        }      
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right',
        location: 'Your historic data'
    }
  
    componentDidMount() {
        // let dataChart =  [{
        //     x: 10,
        //     y: 20
        // }, {
        //     x: 15,
        //     y: 10
        // }]
        // this.setState({data:dataChart});
    }


theData() {

    let values = {
        labels: ['Scatter'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              { x: 65, y: 75 },
              { x: 59, y: 49 },
              { x: 80, y: 90 },
              { x: 81, y: 29 },
              { x: 56, y: 36 },
              { x: 55, y: 25 },
              { x: 40, y: 18 },
            ]
          }
        ]
      };
    this.setState({values:values});
}
  

  
 
render() {
  return (
    <IonCard className="graph-card">
                    <IonCardHeader>
                    <IonCardSubtitle >Effort Diagram</IonCardSubtitle>
                        {/* <IonCardTitle class="total-percentage">
                            { this.searchGradePercentage() }
                            { this.percentageGrade + '%' }
                        </IonCardTitle> */}
                        <IonCardTitle class="total-percentage">  
                        </IonCardTitle>  
                    </IonCardHeader>
                    <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                            {/* <Scatter
                            data= {this.state.values}
                            width={100}
                            height={50}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                layout: {
                                    padding: {
                                        left: 0,
                                        right: 10,
                                        top: 0,
                                        bottom: 0
                                    }
                                },
                                title: {
                                    display: false,
                                    // text: 'Report from' + this.state.indicator.name,
                                    fontSize: 30,
                                    position: 'top',
                                    fontStyle: 'regular',
                                    padding: 12
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            max: 100
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            beginAtZero: true,

                                        }
                                    }]
                                },
                                legend: {
                                    // display: this.props.displayLegend,
                                    // position: this.props.legendPosition,
                                    labels: {
                                        fontSize: 16,
                                        fontStyle: 'regular'
                                    }

                                },
                                tooltips: {
                                    enabled: true,
                                    mode: 'nearest',
                                    backgroundColor: "rgba(224, 232, 216,1)",
                                    titleFontSize: 16,
                                    titleFontColor: "rgba(117, 93, 96, 1)",  
                                    borderColor: "rgba(184, 204, 189, 1)",  
                                    borderWidth: 0.7,
                                    footerFontSize: 22, 
                                    footerFontColor: "rgba(117, 93, 96, 1)",  
                                    footerAlign: 'right',    
                                    bodyFontSize: 18,
                                    bodyFontColor: "rgba(117, 93, 96, 1)",  
                                    caretSize: 10,
                                    yPadding: 10,
                                    xPadding: 10,
                                },
                                elements: {
                                    line: {
                                        tension: 0.4,
                                        borderColor: "rgba(32, 156, 56)",
                                        borderWidth: 1,
                                        borderCapStyle: "square"
                                    },
                                    point: {
                                        backgroundColor: "rgba(14, 128, 37, 1)",
                                        radius: 2,
                                        hitRadius: 4,
                                    }
                                }
                            }}></Scatter> */}
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText>CX Analytics</IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    </IonCardContent>

                </IonCard>
  );
};
}

export default EffortDiagram;

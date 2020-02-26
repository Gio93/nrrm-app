import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './DigitalizationChart2.css'
import { IonCardSubtitle, IonItem, IonText, IonButton, IonLabel, IonIcon } from '@ionic/react';
import { GraphDataChartBar, RippleIndicator } from '../declarations';
import {
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList




} from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';


type State = { data: GraphDataChartBar, indicator: RippleIndicator,showAlert:boolean, alerMessage: string};

export class DigitalionChart2 extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null,
            indicator: null,
            showAlert: false,
            alerMessage: ""
        }      
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right',
        location: 'Your historic data'
    }

    componentDidMount() {
    }


    pocData(){  
        console.log(this.state.data);
    }


    listItems(){
         if(this.state.indicator && this.state.indicator.indicators)
        {
            return (
            
                <IonList>
                {
                    this.state.indicator.indicators.map((item:any, i:any) =>
                    {   
                        return (
                            <IonItem class="item item-text-wrap item-graph" 
                                key={i} 
                            >
                                <IonText>
                                    <strong>
                                        {i+1}.&nbsp;{item.alias}
                                    </strong>
                                </IonText>
                                    
                                <IonButton 
                                    onClick={() => {
                                                      this.setState({showAlert: true});
                                                      this.setState({alerMessage: item.name});
                                                   }
                                            } 
                                    slot="end" 
                                    fill="clear"
                                    size="default"
                                    class="info">
                                    <IonLabel color="success" mode="ios">
                                        { Math.round((item.percentage*100 + Number.EPSILON) * 100) / 100}%
                                    </IonLabel>
                                    <IonIcon icon={informationCircleOutline} mode="ios" color="success" size="small" slot="end">
                                        {/*  */}
                                    </IonIcon>
                                </IonButton>
                            </IonItem>
                        );
                    })
                }
                </IonList>
            );
        }
    }


    
componentDidUpdate(nextProps: any) {
    const { indicator } = this.props;
    const { data } = this.props;
    if (nextProps.indicator !== indicator) {
        if (indicator) {
            this.setState({ indicator: indicator });
        }
    }
    if (nextProps.data !== data) {
        if (data) {
            this.setState({ data: data });
        }
    }
}
    
    render() {
        return (      
            <div className="chart">
                <IonCard className="ion-activatable">
                <IonCardHeader>
                    <div className="container">
                        <div>
                            <IonCardSubtitle>
                                Digitalization grade
                            </IonCardSubtitle>
                            nombre de la cat clicked
                            <IonCardTitle class="totalPercentage important" color="success">
                                x%
                            </IonCardTitle>
                        </div>
                        <div>
                            <IonToolbar>
                            </IonToolbar>
                        </div>
                    </div>
                </IonCardHeader>

                    <div className="contentBarChart">
                        {this.props.data ? 
                            <Bar
                                data={this.state.data}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    layout: {
                                        padding: {
                                            left: 5,
                                            right: 40,
                                            top: 0,
                                            bottom: 5
                                        }
                                    },
                                    title: {
                                        display: false,
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
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition,
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
                                }}
                            />   : null}
                            
                    </div>
                    <IonCardContent>
                    <IonGrid>
                        <IonRow class="ion-align-items-center">
                        <IonCol class="ion-float-left ">
                        {
                            this.listItems()
                        }
                        </IonCol>
                        </IonRow>
                        </IonGrid>
                    </IonCardContent>
            </IonCard>                           
        </div>
        )
    }
}

export default DigitalionChart2;



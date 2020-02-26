import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './DigitalizationChart2.css'
import { IonCardSubtitle, IonItem, IonText, IonButton, IonLabel, IonIcon, IonAlert } from '@ionic/react';
import { GraphDataChartBar, RippleIndicator } from '../declarations';
import {
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

    componentDidMount(){
        console.log("RENDERIZO componentDidMount Chart2 con props:", this.props);
        const { indicator } = this.props;
        const { data } = this.props;
        this.setState({ indicator: indicator });
        this.setState({ data: data });

    }
    
    componentDidUpdate(nextProps: any) {
        console.log("RENDERIZO componentDidUpdate Chart2");
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
                                                      console.log(this.state.showAlert);
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
                {this.props.handlerSpinner(false)}
                </IonList>
                 
            );
            
        }
    }

    
    render() {
        return (      
            <div className="chart">
                <IonCard className="ion-activatable">
                    <IonCardHeader>
                        <IonCardSubtitle>
                            {this.state.indicator? this.state.indicator.name : null} indicators
                        </IonCardSubtitle>
                        <IonCardTitle color="success">
                            {this.state.indicator? this.state.indicator.percentage*100 +'%': null}
                        </IonCardTitle>
                    </IonCardHeader>

                        <div className="contentChart2">
                            {this.state.data ? 
                                <Bar
                                    data={this.state.data}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        layout: {
                                            padding: {
                                                left: 5,
                                                right: 40,
                                                top: 40,
                                                bottom: 5
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
            <IonAlert
                isOpen={this.state.showAlert}
                onDidDismiss={() => this.setState({showAlert: false})}
                header={'Indicator Detail'}
                // subHeader={'Subtitle'}
                message={this.state.alerMessage}
                buttons={['Close']}
            />                          
        </div>
        )
    }
}

export default DigitalionChart2;



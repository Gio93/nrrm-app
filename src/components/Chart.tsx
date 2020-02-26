import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css'
import {
    IonCard, 
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
} from '@ionic/react';


type State = { data: any };

export class Chart extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {}
        }
        
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right',
        location: 'Your historic data'
    }

    componentDidMount() {
        const data = this.state.data;
        this.setState({data})
        // this.setState({
        //     data: {...this.props.data}
        // })
        console.log(this.state.data);
        console.log(this.props.data);
        console.log("EEEEEOOOOOOO");
    }


    pocData(){  
        console.log(this.state.data);
    }

    
    render() {
        console.log(this.props.data)
        console.log(this.state.data)
        console.log("tengo datos??")
        return (
            <div className="chart">
                <IonCard className="ion-activatable">

                    <IonCardHeader>
                        <IonCardSubtitle>
                            Historical digitalization grade
                        </IonCardSubtitle>
                        <IonCardTitle class="totalPercentage important" color="success">
                                Evolution grade
                            </IonCardTitle>

                    </IonCardHeader>
                    <div className="contentChart2">
                        {this.props.data ? 
                            <Line
                                data={this.props.data}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    layout: {
                                        padding: {
                                            left: 5,
                                            right: 25,
                                            top: 60,
                                            bottom: 40
                                        }
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                max: 100
                                            }
                                        }]
                                    },
                                    title: {
                                        display: false,
                                        text: 'Report from' + this.props.title,
                                        fontSize: 60,
                                        position: 'top',
                                        fontStyle: 'regular',
                                        padding: 12
                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition,
                                        align: "center",
                                        fullWidth: true,
                                        labels: {
                                            fontColor: "rgba(255, 0 , 0 , 0.9)",
                                            fontSize: 40,
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
                </IonCard>
            {this.props.data.datasets ? this.pocData() : null}
            </div>
        )
    }
}

export default Chart;



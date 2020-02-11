import React, { Component, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css'
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard
} from '@ionic/react';
import { lineRadial, rgb } from 'd3';



// interface TheProps  {};
// interface TheState { 
//   title: String,
//   data: {};
// }

type State = { data: any };

export class Chart extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {}
        }
        console.log(this.props.data);
        console.log.apply("Esto funciona?")


    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'Your historic data'
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        })
    }


    render() {
        return (
            <div className="chart">

                <IonCard>
                    <IonHeader>

                    </IonHeader>
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
                                            right: 40,
                                            top: 40,
                                            bottom: 5
                                        }
                                    },
                                    // animation: {
                                    //     duration: 2000,
                                    //     onProgress: function(animation) {
                                    //         progress.value = animation.currentStep / animation.numSteps;
                                    //     },
                                    //     onComplete: function() {
                                    //         window.setTimeout(function() {
                                    //             progress.value = 0;
                                    //         }, 2000);
                                    //     }
                                    // },

                                    title: {
                                        display: this.props.displayTitle,
                                        text: 'Report from'+ this.props.title,
                                        fontSize: 20,

                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition,
                                        labels: {
                                            fontSize: 16
                                        }
                                      
                                    },
                                    tooltips: {
                                        enabled: true,
                                        mode: 'nearest',
                                        backgroundColor: "rgba(31, 26, 26,1)",
                                        // titleFontSize: 22,
                                        // footerFontSize: 46,
                                        bodyFontSize: 18,
                                        caretPadding: 2,
                                        caretSize: 5

                                    },
                                    elements: {
                                        line: {
                                            tension: 1
                                        },
                                        point: {
                                            backgroundColor: "rgba(14, 128, 37, 1)",
                                            radius: 2,
                                            hitRadius: 6         
                                        }
                                    }
                                }}
                            /> : null}

                    </div>

                </IonCard>

            </div>
        )
    }
}

export default Chart;



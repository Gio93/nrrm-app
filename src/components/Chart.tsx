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
                                    title: {
                                        display: this.props.displayTitle,
                                        text: 'Report from' + this.props.title,
                                        fontSize: 20,
                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition,
                                        labels: {
                                            fontSize: 16,
                                            fontStyle: 'light'
                                        }

                                    },
                                    tooltips: {
                                        enabled: true,
                                        mode: 'nearest',
                                        backgroundColor: "rgba(36, 64, 42,1)",
                                        // titleFontSize: 22,
                                        // footerFontSize: 46,
                                        bodyFontSize: 18,
                                        caretPadding: 2,
                                        caretSize: 15,
                                        yPadding: 10,
                                        xPadding: 10,
                                    },
                                    elements: {
                                        line: {
                                            tension: 0.5,
                                            borderColor: "rgba(32, 156, 56)",
                                            borderWidth: 1
                                        },
                                        point: {
                                            backgroundColor: "rgba(14, 128, 37, 1)",
                                            radius: 2,
                                            hitRadius: 6,
                                            hoverRadius: 6,
                                            borderWidth: 2,
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



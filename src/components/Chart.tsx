import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css'
import {
    IonCard
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


    // componentDidUpdate() {
    //     this.setState({
    //         data: {...this.props.data}
    //     })
    //     console.log(this.state.data)
    // }

 

    pocData(){  
        console.log(this.state.data);
    }

    


    // Aqui obtenemos el valor maximo y el minimo de historical Data Chart 
    // ---> topValue()
    // ---> lowValue()

    // topValue() {
    //     let topV = (this.props.data.datasets[0].data)
    //     .sort();
    //     // topV.sort((a, b) => (a.topV > b.topV) ? 1 : (a.topV === b.topV) ? ((a.topV > b.topV) ? 1 : -1) : -1 )
    //     console.log(topV[0])
    // }

    // lowValue() {
    //     let lowV = (this.props.data.datasets[0].data)
    //     .sort(-1);
    //     // topV.sort((a, b) => (a.topV > b.topV) ? 1 : (a.topV === b.topV) ? ((a.topV > b.topV) ? 1 : -1) : -1 )
    //     console.log(lowV[0])
    //     console.log("YEEEEEEEEEEEEE")
    // }

    
    render() {
        console.log(this.props.data)
        console.log(this.state.data)
        console.log("tengo datos??")
        return (
            <div className="chart">
                <IonCard>
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
                                        display: false,
                                        text: 'Report from' + this.props.title,
                                        fontSize: 30,
                                        position: 'top',
                                        fontStyle: 'regular',
                                        padding: 12
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
                </IonCard>
            {this.props.data.datasets ? this.pocData() : null}
            </div>
        )
    }
}

export default Chart;



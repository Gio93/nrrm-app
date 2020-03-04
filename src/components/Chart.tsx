import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './Chart.css'
import {
    IonCard, 
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonText,
    IonButton,
    IonLabel
} from '@ionic/react';


type State = { data: any };

export class Chart extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: null
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: false,
        legendPosition: 'right',
        location: 'Your historic data'
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({ data: data });
    }

    componentDidUpdate(nextProps: any) {
        const { data } = this.props;
        if (nextProps.data !== data) {
            if (data) {
                this.setState({ data: data });
            }
        }
    }

    listItems() {
        if (this.state.data) {
            const labels = this.state.data.labels;
            const values = this.state.data.datasets[0].data;
            let history:any[] = [];

            for (let i = 0; i < labels.length; i++) {
                const element = {
                    date: {
                        month: labels[i][0],
                        year: labels[i][1]
                    },
                    value: values[i]
                }
                history.push(element);
            }
        
            return (
                <IonList>
                    {history.map((item:any ,i: any) => {
                        return (
                            <IonItem class="item-graph"
                                key={i}
                            >
                                <IonText>
                                    <strong>
                                        {item.date.month + ' ' + item.date.year}
                                    </strong>
                                </IonText>
                                <IonButton 
                                    // onClick={() => {}}
                                    slot="end" 
                                    fill="clear"
                                    size="default"
                                    class="info"
                                >
                                    <IonLabel color="success" mode="ios">
                                        { Math.round(item.value * 100) / 100 }%
                                    </IonLabel>
                                </IonButton>
                            </IonItem>
                        );
                    })}
                    {/* { this.props.handlerSpinner(false) } */}
                </IonList>
            );
        }
    }

    
    render() {
        return (
            <div>
                <IonCard className="graph-card">
                    <IonCardHeader>
                        <IonCardSubtitle>
                            Historical digitalization grade
                        </IonCardSubtitle>
                        <IonCardTitle class="totalPercentage important" color="success">
                            Evolution grade
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonGrid>
                            <IonRow>
                                <IonCol size-md="5" size="12">
                                    <div className="contentChart2">
                                        {this.state.data ? 
                                            <Line
                                                data={this.state.data}
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
                                                            tension: 0,
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
                                            />
                                        :
                                            null
                                        }
                                    </div>
                                </IonCol>
                                <IonCol size-md="6" offset-md="1" size="12">
                                    { this.listItems() }
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }
}

export default Chart;



import './DigitalizationChart.css'
import { RippleIndicatorInfo, RippleIndicator } from '../declarations';
import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import * as d3 from 'd3';
import { IonRouterLink,IonRouterOutlet, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonIcon, IonList, IonText, IonLabel, IonButton, IonToolbar } from '@ionic/react';
import { withRouter } from "react-router-dom";
import { arrowForward } from 'ionicons/icons';
import { useHistory } from "react-router-dom";

type State = { data: Array<RippleIndicatorInfo>, dataOrigen: Array<RippleIndicator> };

class DigitalizationChart extends React.Component<any, State>{
    ref: any;
    width: number;
    height: number;
    innerRadius: number;
    outerRadius: number;
    rendering: boolean;
    percentageGrade: number;

    constructor(props: any) {
        super(props)
        this.ref = React.createRef();
        this.width = 975;
        this.height = 975;
        this.outerRadius = Math.min(this.width, this.height) / 2;
        this.innerRadius = 180;
        this.rendering = true;

    }




    componentDidMount() {
        //this.createRadialStackedBarChart()
    }
    componentDidUpdate() {
        if (this.props.data && this.props.dataOrigen && this.rendering) {
            this.createRadialStackedBarChart();
            this.rendering = false;
        }
    }

    navigationtoIndicatorDetail(item: RippleIndicator) {
        this.props.history.push('/indicators/' + item.id, item);
    }




    createRadialStackedBarChart() {


        let svg = select(this.ref.current)
            .attr("viewBox", `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`)
            .attr("class", "graphic")
            .style("width", "100%")
            .style("height", "auto")
            .style("font", "1.8em helvetica");
        //.style("padding", "0.1em");

        let x = scaleBand()
            .domain(this.props.data.map((d: any) => d.State))
            .range([0, 2 * Math.PI])
            .align(0);

        let y = scaleLinear()
            .domain([0, d3.max(this.props.data, (d: any) => parseInt(d.total))])
            .range([this.innerRadius, this.outerRadius]);

        let z: any = d3.scaleOrdinal()
            .domain(this.props.data.columns.slice(1))
            .range(["#80c242", "#d1e0e0", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let arc: any = d3.arc()
            .innerRadius((d: any) => y(d[0]))
            .outerRadius((d: any) => y(d[1]))
            .startAngle((d: any) => x(d.data.State))
            .endAngle((d: any) => x(d.data.State) + x.bandwidth())
            .padAngle(0.04)
            .padRadius(this.innerRadius);

        let xAxis = (g: any) => g
            .attr("text-anchor", "middle")
            .call((g: any) => g.selectAll("g")
                .data(this.props.data)
                .join("g")
                .attr("transform", (d: any) => `
                rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
                translate(${this.innerRadius},0)
            `)
                .call((g: any) => g.append("line")
                    .attr("x2", -5)
                    .attr("stroke", "#FFF"))
                .call((g: any) => g.append("text")
                    .attr("transform", (d: any) => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                        ? "rotate(90)translate(0,65)"
                        : "rotate(-90)translate(0,-30)")
                    .text((d: any) => d.State)));

        let yAxis = (g: any) => g
            .attr("text-anchor", "middle")
            .call((g: any) => g.append("text")
                .attr("y", () => -y(y.ticks(5).pop()))
                .attr("dy", "-1.9em"))
            // .text("Population"))
            .call((g: any) => g.selectAll("g")
                .data(y.ticks(5).slice(1))
                .join("g")
                .attr("fill", "none")
                .call((g: any) => g.append("circle")
                    .attr("stroke", "#FFF")
                    // .attr("stroke-opacity", 0.9)
                    .attr("stroke-width", '1.5px')
                    .attr("r", y))
                .call((g: any) => g.append("text")
                    .attr("y", (d: any) => -y(d))
                    .attr("dy", "0.85em")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 5)
                    .text(y.tickFormat(5, "s"))
                    .clone(true)
                    .attr("fill", "#000")
                    .attr("stroke", "none")));

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(this.props.data.columns.slice(1))(this.props.data))
            .join("g")
            .attr("fill", d => z(d.key))
            .selectAll("path")
            .data((d: any) => d)
            .enter()
            .append("path")
            .attr("d", arc);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

    }

    searchGradePercentage() {
        if (this.props.dataOrigen) {
            return (
                this.props.dataOrigen.some((item: RippleIndicator) => {
                    if (item.grade) {
                        this.percentageGrade = item.grade.totalPercentage * 100;
                        return true;
                    }
                    return false;
                })
            );
        }
    }

    listItems() {
        if (this.props.dataOrigen) {
            return (
                <IonList>
                    {
                        this.props.dataOrigen.map((item: RippleIndicator, i: any) => {
                            return (
                                <IonItem class="item item-text-wrap item-graph"
                                    key={i}

                                >
                                    <IonText>
                                        <strong>
                                            {item.name}
                                        </strong>
                                    </IonText>

                                    <IonButton
                                        onClick=
                                        {
                                            () =>
                                                this.navigationtoIndicatorDetail(item)
                                        }
                                        slot="end"
                                        fill="clear"
                                        size="default"
                                        class="info">
                                        <IonLabel color="success" mode="ios">
                                            {Math.round((item.percentage * 100 + Number.EPSILON) * 100) / 100}%
                                </IonLabel>
                                        <IonIcon icon={arrowForward} mode="ios" color="success" size="medium" slot="end">
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

    render() {
        return (
            <div>
                <IonCard className="ion-activatable">
                    

                    <IonCardHeader>
                        <div className="container">
                            <div>
                                <IonCardSubtitle>
                                    Digitalization grade
                        </IonCardSubtitle>
                                {
                                    this.searchGradePercentage()
                                }
                                <IonCardTitle class="totalPercentage important" color="success">
                                    {this.percentageGrade + '%'}
                                </IonCardTitle>
                            </div>
                            <div>
                                <IonToolbar>
                                    <IonButton routerLink="/hitoricalChart">Go historic</IonButton>
                                </IonToolbar>
                            </div>
                        </div>
                    </IonCardHeader>

                    <IonCardContent>

                        <IonGrid>
                            <IonRow>
                                <IonCol class="ion-align-items-center">
                                    <div>
                                        <svg ref={this.ref}
                                            width={this.width} height={this.height}>
                                        </svg>
                                    </div>
                                </IonCol>
                            </IonRow>
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
        );
    }
}



export default withRouter(DigitalizationChart);
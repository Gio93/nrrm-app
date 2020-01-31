import './DigitalizationChart.css'
import { RippleIndicatorInfo, RippleTypeDto, TechnologiesInvolvedDto, RippleIndicator } from '../declarations';
import React from 'react';
import { scaleLinear,scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { axisBottom,axisLeft,axisRight,axisTop} from 'd3-axis'
import * as d3 from 'd3';
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonChip, IonLabel, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonIcon, IonList } from '@ionic/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

type State = {data:Array<RippleIndicatorInfo>, dataOrigen:Array<RippleIndicator>};

class DigitalizationChart extends React.Component<any,State>{
    ref:any;
    width: number;
    height: number;
    innerRadius: number;
    outerRadius : number;
    rendering: boolean;
    

    constructor(props:any){
        super(props)
        //this.createRadialStackedBarChart = this.createRadialStackedBarChart.bind(this)
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
        if(this.props.data && this.props.dataOrigen && this.rendering){
            this.createRadialStackedBarChart();
            this.rendering=false;
        } 
     }
     
     createRadialStackedBarChart() {
         

        let svg = select(this.ref.current)
            .attr("viewBox", `${-this.width / 2} ${-this.height / 2} ${this.width} ${this.height}`)
            .style("width", "100%")
            .style("height", "auto")
            .style("font", "1.8em helvetica");
            //.style("padding", "0.1em");

        let x = scaleBand()
            .domain(this.props.data.map((d:any) => d.State))
            .range([0, 2 * Math.PI])
            .align(0);

        let y = scaleLinear()
            .domain([0, d3.max(this.props.data, (d:any) => parseInt(d.total))])
            .range([this.innerRadius , this.outerRadius ]);

        let z: any = d3.scaleOrdinal()
            .domain(this.props.data.columns.slice(1))
            .range(["#80c242", "#d1e0e0",  "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let arc:any = d3.arc()
            .innerRadius((d:any) => y(d[0]))
            .outerRadius((d:any) => y(d[1]))
            .startAngle((d:any) => x(d.data.State))
            .endAngle((d:any) => x(d.data.State) + x.bandwidth())
            .padAngle(0.04)
            .padRadius(this.innerRadius);

        let xAxis = (g:any) => g
        .attr("text-anchor", "middle")
        .call((g:any)  => g.selectAll("g")
            .data(this.props.data)
            .join("g")
            .attr("transform", (d:any) => `
                rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 90)})
                translate(${this.innerRadius},0)
            `)
            .call((g:any) => g.append("line")
                .attr("x2", -5)
                .attr("stroke", "#FFF"))
            .call((g:any) => g.append("text")
                .attr("transform", (d:any) => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                    ? "rotate(90)translate(0,65)"
                    : "rotate(-90)translate(0,-30)")
                .text((d:any) => d.State)));
        
        let yAxis = (g:any) => g
        .attr("text-anchor", "middle")
        .call((g:any) => g.append("text")
            .attr("y", (d:any) => -y(y.ticks(5).pop()))
            .attr("dy", "-1.9em")
            .text("Population"))
        .call((g:any) => g.selectAll("g")
            .data(y.ticks(5).slice(1))
            .join("g")
            .attr("fill", "none")
            .call((g:any) => g.append("circle")
                .attr("stroke", "#FFF")
               // .attr("stroke-opacity", 0.9)
                .attr("stroke-width", '1.5px')
                .attr("r", y))
            .call((g:any) => g.append("text")
                .attr("y", (d:any) => -y(d))
                .attr("dy", "0.85em")
                .attr("stroke", "#fff")
                .attr("stroke-width", 5)
                .text(y.tickFormat(5, "s"))
                .clone(true)
                .attr("fill", "#000")
                .attr("stroke", "none")));

       /* let legend = (g:any) => g.append("g")
        .selectAll("g")
        .data(this.props.data.columns.slice(1).reverse())
        .join("g")
            .attr("transform", (d:any,i:any) => `translate(-40,${(i - (this.props.data.columns.length - 1) / 2) * 20})`)
            .call((g:any) => g.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", z))
            .call((g:any) => g.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text((d:any) => d))*/

        svg.append("g")
            .selectAll("g")
            .data(d3.stack().keys(this.props.data.columns.slice(1))(this.props.data))
            .join("g")
                .attr("fill", d => z(d.key))
            .selectAll("path")
            .data((d:any) => d) 
            .enter()
                .append("path")
                .attr("d", arc);
        
        svg.append("g")
            .call(xAxis);
    
        svg.append("g")
            .call(yAxis);
    
        // svg.append("g")
        //     .call(legend);
        
     }

  render() {
        return (
            <div>
                <IonCard className="ion-activatable">
                    <IonCardHeader>
                    <IonCardSubtitle>
                        Digitalization grade
                        </IonCardSubtitle>
                        <IonCardTitle>Indicator Groups</IonCardTitle>
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
  this.props.dataOrigen? <IonList>{this.props.dataOrigen.map((item:any, i:any) => <IonItem class="item item-text-wrap" key={i}><strong>{item.name}</strong>&nbsp;<small>{'('+item.alias+')'}</small>&nbsp;->&nbsp;{item.percentage*100}%<IonIcon name="arrow-dropright-circle" mode="ios" color="success" size="medium" slot="end"></IonIcon></IonItem>)}</IonList> : null
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


export default DigitalizationChart;
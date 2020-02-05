import './BarChartSubIndicators.css'
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon, IonBackButton, IonFabButton, IonFab } from '@ionic/react';
import React, { useEffect,Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from "react-router-dom";
import { RippleIndicator } from '../declarations';

import * as d3 from 'd3';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3';



//Function Component Definition
class BarChartSubIndicators extends Component < RouteComponentProps<any>, {indicator: RippleIndicator}>{
    ref:any;
    // indicador: RippleIndicator;
    margin: any;
    width:number;
    height:number;
    rendering: boolean;

    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
        this.margin = {top: 20, right: 20, bottom: 70, left: 10};
        this.width = 300;
        this.height = 300;
        // this.indicador = this.props.location.state;
        this.state = {
            indicator: this.props.location.state
        }
    }

    

    componentDidMount() {
        console.log("Pagina Montada, lanzando gráfico...");
        this.createRadialSimpleBarChar(this.formatData(this.state.indicator));        
    }

    componentDidUpdate(prevProps:any) {
        // console.log("Mis indicadores", this.subindicadores);
        // if(this.state.indicator && this.subindicadores.length>0 && this.rendering){
            if ( this.props.location.state) {
                let svg = select("#graph");
                svg.remove();
                let dataPowered = this.formatData(this.props.location.state);
                this.createRadialSimpleBarChar(dataPowered);
            }
            // this.rendering = false;
        // }
    }
     

    formatData(preData:RippleIndicator){
        let formattedData = [];
        
        console.log("Formateo de datos");
        if(preData.indicators){
            let childIndicators = preData.indicators;
            for(let i=0;i<childIndicators.length;i++){
                let itemBar:any = {};
                itemBar.name = childIndicators[i].name;
                itemBar.value = (childIndicators[i].percentage*100).toFixed(2);
                formattedData.push(itemBar);
            }
        }
        console.log("Datos de salida: ", formattedData);
        return formattedData;
    }

    createRadialSimpleBarChar(data:any[]){

        console.log("Construyendo chart.................");
        if(data.length>0){
            let svg = select(this.ref.current).append("svg")
                .attr("id", "graph")
                .attr("width", "300")
                .attr("height", "300")
                //.attr("width", this.width + this.margin.left + this.margin.right)
                //.attr("height", this.height + this.margin.top + this.margin.bottom)
                .style("width", "100%")
                .style("font", "1.8em helvetica")
                .style("padding", "0.1em")
                .append("g")
                .attr("transform", 
                    "translate(" + this.margin.left + "," + this.margin.top + ")");
                // .attr("viewBox", `${0} ${0} ${this.width} ${this.height}`)   
                

            let x = d3.scaleBand()
                    // .domain(d3.range(this.subindicadores.length))
                    .domain(data.map(function(d:any) { return d.name; }))
                    .range([this.margin.left, this.width - this.margin.right])
                    .padding(0.1);

                

            
            let y =  d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)]).nice()
                .range([this.height - this.margin.bottom, this.margin.top])

            let xAxis =  (g:any) => g
                .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
                .call(d3.axisBottom(x)/*.tickFormat((d,i) => this.subindicadores[i].name).tickSizeOuter(0)*/);
            
            
            let yAxis = (g:any) => g
                .attr("transform", `translate(${this.margin.left},0)`)
                .call(d3.axisLeft(y))
                .call((g:any) => g.select(".domain").remove())

            // x.domain(this.subindicadores.map(function(d:any) { return d.name; }));
            
            svg.append("g")
                .attr("fill", "#80c242")
                .selectAll("rect")
                .data(data)
                    .join("rect")
                        .attr("x", function(d) { return x(d.name); })
                        .attr("y", (d:any) => y(d.value))
                        .attr("height", (d:any) => y(0) - y(d.value))
                        .attr("width", x.bandwidth());

            svg.append("g")
            .call(xAxis);

            svg.append("g")
                .call(yAxis);
            
            //     svg.append("g")
            //     .attr("class", "x axis")
            //     .attr("transform", "translate(0," + this.height + ")")
            //     .call(xAxis)
            //   .selectAll("text")
            //     .style("text-anchor", "end")
            //     .attr("dx", "-.8em")
            //     .attr("dy", "-.55em")
            //     .attr("transform", "rotate(-90)" );
        
            // svg.append("g")
            //     .attr("class", "y axis")
            //     .call(yAxis)
            //   .append("text")
            //     .attr("transform", "rotate(-90)")
            //     .attr("y", 6)
            //     .attr("dy", ".71em")
            //     .style("text-anchor", "end")
            //     .text("Value ($)");
        
            // svg.selectAll("bar")
            //     .data(this.subindicadores)
            //   .enter().append("rect")
            //     .style("fill", "steelblue")
            //     .attr("x", function(d) { return x(d.name); })
            //     .attr("width", x.bandwidth())
            //     .attr("y", function(d) { return y(d.value); })
            //     .attr("height", d => this.height - y(d.value));      
                
        }
    }

    static getDerivedStateFromProps = (nextProps:any, prevState:any) => {
        return { indicator: nextProps.location.state }
    }
    
    

    render(){
        return(
             <IonPage>
             <IonHeader>
               <IonToolbar>
                 <IonButtons slot="start">
                    <IonBackButton  defaultHref="/dgrade/"/>
                 </IonButtons>
                 <IonTitle>Digitalization Grade</IonTitle>
               </IonToolbar>
             </IonHeader>
             <IonContent>
                <div>
                    <IonCard className="ion-activatable">
                                <IonCardHeader>
                                    <IonCardSubtitle>
                                        {this.state.indicator? this.state.indicator.name : null} indicators
                                    </IonCardSubtitle>
                                    <IonCardTitle color="success">
                                        {this.state.indicator? this.state.indicator.percentage*100 +'%': null}
                                    </IonCardTitle>
                                </IonCardHeader>
                
                                <IonCardContent>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol class="ion-align-items-center">
                                                <div ref={this.ref}>
                                                    {/* <svg ref={this.ref}
                                                       width={this.width} height={this.height}>
                                                    </svg> */}
                                                </div>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow class="ion-align-items-center">
                                            <IonCol class="ion-float-left ">
                                                {
                                                    this.state.indicator? this.state.indicator.indicators? <IonList>{this.state.indicator.indicators.map((item:any, i:any) => <IonItem class="item item-text-wrap" key={i} ><strong>{item.name}</strong>&nbsp;<small>{'('+item.alias+')'}</small>&nbsp;->&nbsp;{ Math.round((item.percentage*100 + Number.EPSILON) * 100) / 100}%</IonItem>)}</IonList> : null : null
                                                }
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                    </IonCard>
                </div>
             </IonContent>
           </IonPage>
        );
    };
}



export default withRouter(BarChartSubIndicators);


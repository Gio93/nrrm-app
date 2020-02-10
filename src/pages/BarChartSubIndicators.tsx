import './BarChartSubIndicators.css'
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonBackButton, IonIcon, IonAlert, IonButton, IonText, IonLabel } from '@ionic/react';
import React, { Component, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from "react-router-dom";
import { RippleIndicator } from '../declarations';

import * as d3 from 'd3';
import { select } from 'd3-selection';
import { informationCircleOutline } from 'ionicons/icons';


//Function Component Definition
class BarChartSubIndicators extends Component < RouteComponentProps<any>, {indicator: RippleIndicator, showAlert:boolean, alerMessage: string}>{
    ref:any;
    // indicador: RippleIndicator;
    margin: any;
    width:number;
    height:number;
    rendering: boolean;
    romanos: Array<String>;
    
   

    constructor(props: any) {
        super(props);
        this.ref = React.createRef();
        this.margin = {top: 20, right: 20, bottom: 70, left: 10};
        this.width = 300;
        this.height = 300;
        // this.indicador = this.props.location.state;
        this.state = {
            indicator: this.props.location.state,
            showAlert: false,
            alerMessage: ""
        }
        this.romanos  = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
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
                itemBar.name = (i+1).toString();//this.romanos[i]//childIndicators[i].name;
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
                    .domain(data.map(function(d:any,i:number) { return d.name}))
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
            .call(xAxis)
            

            svg.append("g")
                .call(yAxis);   
                
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

    static getDerivedStateFromProps = (nextProps:any) => {
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
                                    <IonCardTitle color="success" class="totalPercentage">
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
                                                    this.listItems()
                                                }
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                    </IonCard>
                </div>
                <IonAlert
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({showAlert: false})}
                    header={'Indicator Detail'}
                    // subHeader={'Subtitle'}
                    message={this.state.alerMessage}
                    buttons={['Close']}
                />
             </IonContent>
           </IonPage>
        );
    };
}



export default withRouter(BarChartSubIndicators);


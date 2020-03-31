import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonChip, IonLabel, IonGrid, IonRow, IonCol, IonRippleEffect } from '@ionic/react';
import {CardInfo, RippleTypeDto, TechnologiesInvolvedDto, RippleImplementationTypeDto} from '../declarations';
import './Card.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



class Card extends React.Component<CardInfo, any> {

    
    constructor(props: any){
        super(props);
        console.debug("constructor");
    };

    render() {
        return (            
            <IonCard onClick={()=>this.props.onClick()} className="ion-activatable ripple-card">
                <IonRippleEffect className="customRipple"></IonRippleEffect>
                <IonCardHeader>
                    <IonCardSubtitle>
                        { this.props.technologies.map((x:TechnologiesInvolvedDto) =>
                            <IonChip key={x.id} color="secondary">
                                <IonLabel>{x.technologiesType}</IonLabel>
                            </IonChip>
                        )}
                    </IonCardSubtitle>
                    <IonCardTitle>{this.props.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                    <IonRow>
                        <IonCol size="8">
                            { this.props.description }
                        </IonCol>
                        <IonCol size="4">
                            <CircularProgressbar 
                                value={this.props.progress} 
                                text={`${this.props.progress}%`} 
                                styles={buildStyles({
                                pathColor: `${(this.props.progress>80)?'rgba(0,200,0,1)':(this.props.progress>50)?'rgba(0,0,200,1)':'rgba(200,0,0,1)'}`,
                                textColor: `${(this.props.progress>80)?'rgba(0,200,0,1)':(this.props.progress>50)?'rgba(0,0,200,1)':'rgba(200,0,0,1)'}`
                                })}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            { this.props.types.map((x:RippleTypeDto) => {
                                return (
                                    <IonChip 
                                        style={{width: 'max-content', color: 'white',background:this.props.colorHandler(x.id)}}
                                        key={x.rippleType} 
                                        // color={x.rippleType.split(" ").join("").toLowerCase()}
                                        // color={this.props.colorHandler(x.id)}
                                    >
                                        <IonLabel>{x.rippleType}</IonLabel>
                                    </IonChip>
                                )
                            })}
                            { this.props.implementationType.map((x:RippleImplementationTypeDto) => {
                                return (
                                    <IonChip 
                                        style={{width: 'max-content'}}
                                        key={x.id}
                                    >
                                        <IonLabel>{x.implementationType}</IonLabel>
                                    </IonChip>
                                )
                            })}
                        </IonCol>
                        <IonCol>
                            <IonLabel class="ion-float-right ion-align-self-center circularLabel" color="dark">
                                { this.props.owner.split(" ").map((x)=>x.charAt(0)).join("")}
                            </IonLabel>
                        </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        );
    }
    

}

export default Card;
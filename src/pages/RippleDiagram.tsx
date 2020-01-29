import './RippleDiagram.css'
import './RippleDiagramAnims.css'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
        IonPage, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonButtons, IonTitle, IonContent, IonItemDivider, IonIcon, IonSegment, IonSegmentButton, IonBackButton, IonInput, IonNote, IonProgressBar, IonLoading, IonCol, IonRow, IonFab, IonFabButton, IonMenuButton
        } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import API from '../utils/httpUtils';
import  RippleRoadDiagram  from "../components/RippleRoadDiagram";
import { RippleInfo, RippleDiagramNode } from '../declarations';
import { stats, list } from 'ionicons/icons';

type Props = { props:any };

type RippleDetail = {
    values:Array<any>
}

type KeyAndValue = {
    key : string,
    value? : string,
    numberValue? : number
}

const RippleDiagramPage: React.FC<Props & RouteComponentProps<any>> = (Params) => {
    
  const myapi = new API(Params);
  const [showLoading, setShowLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [closeModal, setCloseModal] = useState(false);


  const [data, setData] = useState<Array<RippleDiagramNode>>(null);
  console.log("RippleDiagramPage");

    const loadData=()=>{
      setShowLoading(true);
      myapi.doGet("/nrrm-ripple/ripple").then(data => {
        setShowLoading(false);
        return flatterDataSet(data);
      });
    }

    const flatterDataSet = (data:Array<RippleInfo>)=>{
      if(!data) return;
      let flatData:Array<RippleDiagramNode> = [
        {
          id:0,
          name:"",
          smallDescription:"",
          father:undefined,
          type:0,
          isOpened:true
        }
      ];
      for(let i=0;i<data.length;i++){
        flatData.push({
          id:data[i].id,
          name:data[i].name,
          smallDescription:data[i].smallDescription,
          father: (data[i].predecessor)?data[i].predecessor.id : 0,
          type: (data[i].type)?data[i].type.id : 0,
          isOpened:true
        });
      }
      setData(flatData.sort((a,b)=>a.id-b.id));

    }

    const onClickNode = (node : RippleDiagramNode)=>{
      // var buttonId = "six";
      // document.querySelector('#modal-container').removeAttr('class').addClass(buttonId);
      // document.querySelector('body').addClass('modal-active');
      setAnimate(!animate);
    }

    useEffect(() => {
       loadData();
    }, []);  

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                {/* <IonBackButton  defaultHref="/ripple/"/> */}
                <IonMenuButton />
              </IonButtons>
              <IonTitle>Ripple Diagram</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>

          <div id="modal-container" className={`${animate?"six":""} ${closeModal?"out":""}`} onClick={(a)=>{
            setCloseModal(true);
            setTimeout(()=>{
              setAnimate(false);
              setCloseModal(false);
            },500)
          }}>
  <div className="modal-background">
    <div className="modal">
      <h2>I'm a Modal</h2>
      <p>Hear me roar.</p>
      <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
								<rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
							</svg>
    </div>
  </div>
</div>

          <IonLoading
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}
              message={'Loading...'}
              duration={5000}
            />
          <div style={{ display: "flex" }}>
          <RippleRoadDiagram onClickNode={(a:RippleDiagramNode)=>onClickNode(a)}
              data={data}
            />
          </div>
          <div className="wrapperlow">
              <div className="wavelow"></div>
          </div>
          <div className="legend" style={{

          }}>
            <IonRow>
            <IonCol size="1">
            <div 
              className='nodeBoxLegend1' 
              style={{
                'cursor':'pointer',
                'height':'20px',
                'width':'20px',
                'display':'flex',
                }}></div>
            </IonCol>
            <IonCol>
              Backbone 
            </IonCol>
            </IonRow>

            <IonRow>
            <IonCol size="1">
            <div 
              className='nodeBoxLegend2' 
              style={{
                'cursor':'pointer',
                'height':'20px',
                'width':'20px',
                'display':'flex',
                }}></div>
            </IonCol>
            <IonCol>
              Nimbl System Integration
            </IonCol>
            </IonRow>

            <IonRow>
            <IonCol size="1">
            <div 
              className='nodeBoxLegend3' 
              style={{
                'cursor':'pointer',
                'height':'20px',
                'width':'20px',
                'display':'flex',
                }}></div>
            </IonCol>
            <IonCol>
            Nimbl Digital Asset  
            </IonCol>
            </IonRow>
            
          </div>

          <IonFab vertical="bottom" horizontal="end" slot="fixed" >
            <IonFabButton routerLink="/ripple">
              <IonIcon icon={list} color="light"/>
            </IonFabButton>
          </IonFab> 
          </IonContent>
        </IonPage>
    );
};

export default RippleDiagramPage;
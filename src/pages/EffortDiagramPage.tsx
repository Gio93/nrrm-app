import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import  EffortDiagram  from '../components/EffortDiagram';


type Props = { props:any };

//Function Component Definition
const EffortDiagramPage:React.FC<Props & RouteComponentProps<any>> = (Params) => {
  

  return (
    <IonPage>
      <IonHeader>

        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Effort Diagram Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <EffortDiagram></EffortDiagram>
      </IonContent>
    </IonPage>
  );
};

export default EffortDiagramPage;

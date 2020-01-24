import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar  } from '@ionic/react';
import React from 'react';
import './Home.css';
import image from '../assets/images/logoNRM.png';
import videobgWebm from '../assets/video/loopWaves.webm';

const HomePage: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
      <div className="backgrounddiv">

      <video autoPlay webkit-playsinline="true" playsInline loop muted id="backgroundvideo">
        {/* <source src={videobgMp4} type='video/mp4; codecs="h.264"'/> */}
        <source src={videobgWebm} type="video/webm"/>
      </video>
      <div className="ion-text-center">
        <img src={image} alt="logo" width="50%" className="centerAbsolute"/> 
      </div>
      </div>
      </IonContent>
      </IonPage> 
  );
};

export default HomePage;

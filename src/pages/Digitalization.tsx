import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useLayoutEffect } from 'react';

//Function Component Definition
const DigitalizationGrade: React.FC = () => {

  // https://es.reactjs.org/docs/hooks-reference.html
  // para bindear los objetos con la vista usa el método setState, por ejemplo, 
  // const [showLoading, setShowLoading] = useState(true);
  // esto crea un parametro llamado "showLoading" con un método de seteo "setShowLoading" y por defecto tiene el valor "true"
  // que puedes bindear en el template y que se gestiona con el ciclo de vida de la pantalla

  //hook que se lanza al cargar el componente en pantalla
  useEffect(()=>{

  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Digitalization Grade</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      </IonContent>
    </IonPage>
  );
};



export default DigitalizationGrade;

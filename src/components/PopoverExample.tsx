import React, { useState } from 'react';
import { IonPopover, IonButton } from '@ionic/react';

export const PopoverExample: React.FC = () => {
  const [showPopover, setShowPopover] = useState(false);

  // function presentPopover(ev:any) {
  //   const popover = Object.assign(document.createElement('ion-popover'), {
  //     component: 'popover-example-page',
  //     event: ev,
  //     translucent: true
  //   });
  //   document.body.appendChild(popover);
  //   return popover.present();
  // }

  return (
    <>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}
      >
        <button>Colapse</button>
        <button>Go Ripple</button>
      </IonPopover>
      <IonButton onClick={() => setShowPopover(true)}>Show Popover</IonButton>
    </>
  );
};
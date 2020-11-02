import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const Live: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Live Position</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonTitle></IonTitle>
      </IonContent>
    </IonPage>
  );
};

export default Live;
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './custom.css'

import { save } from 'ionicons/icons';

import LocationComponent from '../components/GeolocationComponent';

const Live: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Live Position</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-margin">
          <IonRow>
            <IonCol>
              <IonTitle>Your current position is :</IonTitle>
            </IonCol>
          </IonRow>
          <LocationComponent />
          <IonRow>
            <IonCol>
              <IonButton fill='outline'><IonIcon slot="start" icon={save} /> <IonLabel slot='end'>Save!</IonLabel></IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Live;
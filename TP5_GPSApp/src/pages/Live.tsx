import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import './custom.scss'

import { save } from 'ionicons/icons';

import TestComponent from '../components/testComponent';
import AppContext from '../data/app-context'

const Live: React.FC = () => {
  const appCtx = useContext(AppContext)

  const localupdateCoordinates = () => {
    let updatedCoordonates = { ...appCtx.coordinates }
    updatedCoordonates.latitude = parseFloat(document.getElementById('longData')?.textContent!)
    updatedCoordonates.longitude = parseFloat(document.getElementById('latiData')?.textContent!)
    appCtx.updateCoordinates(updatedCoordonates)
  }

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
          <TestComponent />
          <IonRow>
            <IonCol>
              <IonButton fill='outline' onClick={() => localupdateCoordinates()}><IonIcon slot="start" icon={save} /> <IonLabel slot='end'>Save!</IonLabel></IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Live;
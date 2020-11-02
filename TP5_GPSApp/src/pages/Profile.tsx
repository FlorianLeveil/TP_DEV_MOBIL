import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './custom.css'

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem id='name'>
            <IonLabel>Nom</IonLabel>
            <IonLabel className="ion-text-end">Yann</IonLabel>
          </IonItem>
          <IonItem id='lastLat'>
            <IonLabel>Dernière Latitude :</IonLabel>
            <IonLabel className="ion-text-end">10</IonLabel>
          </IonItem>
          <IonItem id='lastLon'>
            <IonLabel>Dernière Longitude :</IonLabel>
            <IonLabel className="ion-text-end">-0.5</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
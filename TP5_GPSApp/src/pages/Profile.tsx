import { IonAlert, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react';

import './custom.scss';

import AppContext from '../data/app-context';

const Profile: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const appCtx = useContext(AppContext)

  const updateUsername = (newUsername: string) => {
    let updatedProfile = { ...appCtx.profile }
    updatedProfile.name = newUsername
    appCtx.updateProfile(updatedProfile)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem id='name' onClick={() => setShowAlert(true)}>
            <IonLabel>Nom</IonLabel>
            <IonLabel className="ion-text-end">{appCtx.profile.name}</IonLabel>
          </IonItem>
          <IonItem id='lastLat'>
            <IonLabel>Dernière Latitude :</IonLabel>
            <IonLabel className="ion-text-end">{appCtx.coordinates.latitude}</IonLabel>
          </IonItem>
          <IonItem id='lastLon'>
            <IonLabel>Dernière Longitude :</IonLabel>
            <IonLabel className="ion-text-end">{appCtx.coordinates.longitude}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Username'}
        inputs={[
          {
            name: 'usernameInput',
            type: 'text',
            id: 'profile-username',
            value: appCtx.profile.name,
            placeholder: 'New username'
          }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text: 'Ok',
            cssClass: 'primary',
            handler: (alertData) => {
              updateUsername(alertData.usernameInput)
            }
          }
        ]}
      />
    </IonPage>
  );
};

export default Profile;
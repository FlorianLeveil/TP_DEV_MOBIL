import React, { Suspense, useContext } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonSpinner, IonTitle } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';

import './Profile.scss';
import AppContext from '../data/app-context';
import UserInformationItem from '../components/UserInformation';
import ResponsiveContent from '../components/ResponsiveContent';

import Logout from '../components/Auth/Logout';
import ProfilePicture from '../components/ProfilePicture';
import UserUtilisationInformation from '../components/UserUtilisationInformation';

const Profile: React.FC = () => {
  const appCtx = useContext(AppContext);
  const userdata = appCtx.userdata;

  return (
    <IonPage id="User">
      <IonContent>
        <IonGrid>
          <IonRow id="headerRow" className="ion-justify-content-around ion-align-items-center">
            <Suspense fallback={<IonSpinner />}>
              <ProfilePicture />
            </Suspense>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeLg='7'>
              <IonList mode="ios">
                <IonListHeader>
                  <IonLabel>
                    Ton Profile
                  </IonLabel>
                </IonListHeader>
                <UserInformationItem userdata={userdata.username} field='username' friendlyName='Pseudo' unit='' type='text' />
                <UserInformationItem userdata={userdata.name} field='name' friendlyName='Name' unit='' type='text' />
                <UserInformationItem userdata={userdata.lastname} field='lastname' friendlyName='Lastname' unit='' type='text' />
                <UserInformationItem userdata={userdata.description} field='description' friendlyName='Description' unit='' type='textarea' />
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeLg='7'>
              <IonList mode="ios">
                <IonListHeader>
                  <IonLabel>
                    Informations
                  </IonLabel>
                </IonListHeader>
                <UserUtilisationInformation userdata={userdata.username} field='username' friendlyName='Nombres de contact' unit='' type='text' />
                <UserUtilisationInformation userdata={userdata.name} field='name' friendlyName='Nombres de messages envoyées' unit='' type='text' />
                <UserUtilisationInformation userdata={userdata.lastname} field='lastname' friendlyName='Lastname' unit='' type='text' />
                <UserUtilisationInformation userdata={userdata.description} field='description' friendlyName='Description' unit='' type='textarea' />
              </IonList>
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-center">
            <IonCol size="12" sizeLg='7'>
                <Logout>
                  <IonButton expand="full" color="danger">
                    <IonLabel>Logout</IonLabel>
                    <IonIcon slot='end' icon={ exitOutline }/>
                  </IonButton>
                </Logout>
            </IonCol>
          </IonRow>
                
        </IonGrid>
      </IonContent>       
    </IonPage>
  );
};

export default Profile;
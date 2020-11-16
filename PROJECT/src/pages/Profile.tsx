import React, { Suspense, useContext } from 'react';
import { IonButton, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonSpinner, IonTitle } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';

import './Profile.scss';
import AppContext from '../data/app-context';
import UserInformationItem from '../components/UserInformation';
import ResponsiveContent from '../components/ResponsiveContent';

import Logout from '../components/Auth/Logout';

const Profile: React.FC = () => {
  const appCtx = useContext(AppContext);
  const userdata = appCtx.userdata;

  return (
    <IonPage id="User">
      <IonContent>
        <IonGrid className="ion-no-padding">
          <IonRow id="headerRow" className="ion-justify-content-around ion-align-items-center">
            <Suspense fallback={<IonSpinner />}>
            </Suspense>
          </IonRow>
          <IonRow>
            <ResponsiveContent>
              <IonList className="ion-margin ion-padding" mode="ios">
                <IonListHeader className="ion-padding-bottom">
                  <IonTitle>Informations</IonTitle>
                </IonListHeader>
                <UserInformationItem userdata={userdata.username} field='username' friendlyName='Pseudo' unit='' type='text' />
                <UserInformationItem userdata={userdata.name} field='name' friendlyName='Name' unit='' type='text' />
                <UserInformationItem userdata={userdata.lastname} field='lastname' friendlyName='Lastname' unit='' type='text' />
                <UserInformationItem userdata={userdata.description} field='description' friendlyName='Description' unit='' type='textarea' />
                <IonItem>
                  <IonLabel></IonLabel>
                  <Logout>
                    <IonButton>
                      <IonLabel>Disconnect</IonLabel>
                      <IonIcon slot='end' icon={ exitOutline }/>
                    </IonButton>
                  </Logout>
                </IonItem>
                
              </IonList>
            </ResponsiveContent>
          </IonRow>
        </IonGrid>
      </IonContent>       
    </IonPage>
  );
};

export default Profile;
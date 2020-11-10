import {
  IonAlert,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import React, { Suspense, useContext, useState } from 'react';
import './Profile.scss';
import { useHistory, useParams } from 'react-router-dom';
import AppContext, { Picture, UserData } from '../data/app-context';
import UserInformationItem from '../components/UserInformation';
import ResponsiveContent from '../components/ResponsiveContent';
import firebase from "../firebase";
import "firebase/firestore";

const Profile: React.FC = () => {
  const id = useParams<{ id: string }>().id;
  const [picturesBase64, setPicturesBase64] = useState<string[]>();
  const appCtx = useContext(AppContext)
  // const userdata = appCtx.userdata.find(userdata => userdata.id === id)
  console.log(appCtx)
  const userdata = appCtx.userdata.find(userdata => userdata.id === 'b4Es3U2wWrho6xjOibUGOC96zpg1')
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
              <IonList className="ion-padding" mode="ios">
                <IonListHeader className="ion-padding-bottom">
                  Informations {userdata?.birthdate}
                </IonListHeader>
                <UserInformationItem userdata={'lol'} field='username' friendlyName='Pseudo' unit='' type='textarea' />
                <UserInformationItem userdata={'lol'} field='name' friendlyName='Name' unit='' type='textarea' />
                <UserInformationItem userdata={'lol'} field='lastname' friendlyName='Lastname' unit='' type='textarea' />
                <UserInformationItem userdata={'lol'} field='description' friendlyName='Description' unit='' type='textarea' />
              </IonList>
            </ResponsiveContent>
          </IonRow>
        </IonGrid>
      </IonContent>       
    </IonPage>
  );
};

export default Profile;
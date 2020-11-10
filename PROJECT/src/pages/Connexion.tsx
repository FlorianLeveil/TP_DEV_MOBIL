import { IonItemSliding,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote, IonList, IonListHeader, IonAvatar, IonFabButton, IonIcon, IonGrid, IonRow, IonFab, IonCol, IonInput, IonButton } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { add, personCircle } from 'ionicons/icons';
import './Home.css';
import AddUserModal from '../components/AddUserModal';
import AppContext from '../data/app-context';
import ResponsiveContent from '../components/ResponsiveContent';



const Connexion: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const appCtx = useContext(AppContext);
	return (
	<IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonRow>
            <IonCol>
                <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
                />
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                    type="email"
                    >
                </IonInput>
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonCol>
                <p style={{ fontSize: "small" }}>
                By clicking LOGIN you agree to our <a href="#">Policy</a>
                </p>    
                <IonButton expand="block">
                Login
                </IonButton>    <p style={{ fontSize: "medium" }}>
                Don't have an account? <a href="#">Sign up!</a>
                </p>
            </IonCol>
        </IonRow>
      <AddUserModal showModal={showModal} setShowModal={setShowModal}/>
      <IonContent className="ion-padding">
        <IonGrid className="ion-no-padding">
          <IonRow>
            <ResponsiveContent>
              <IonGrid>
                <IonRow>
                </IonRow>
              </IonGrid>
            </ResponsiveContent>
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>

  );
};

export default Connexion;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonFabButton, IonIcon, IonGrid, IonRow, IonFab, IonCol, IonInput, IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { add, personCircle } from 'ionicons/icons';
import './Home.css';
import AddUserModal from '../components/AddUserModal';
import ResponsiveContent from '../components/ResponsiveContent';

const Connexion: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
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
                By clicking LOGIN you agree to our <a href="https://www.google.com">Policy</a>
                </p>    
                <IonButton expand="block">
                Login
                </IonButton>    <p style={{ fontSize: "medium" }}>
                Don't have an account? <a href="https://www.google.com">Sign up!</a>
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

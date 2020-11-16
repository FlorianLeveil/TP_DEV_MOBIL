import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonModal, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useState } from 'react';
import firebase from '../firebase';

import AppContext from '../data/app-context';
import { text } from 'ionicons/icons';

const ContactAddUserModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const appCtx = useContext(AppContext);
    const [searchText, setSearchText] = useState('');
    const contacts = ['user1', 'user2', 'user3', 'user4', 'user5'];


    return (
        <IonModal isOpen={props.showModal}>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Recherche Contact </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => props.setShowModal(false)}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
            <IonSearchbar autocorrect="off" onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                <IonList>
                    <IonItem>
                        <IonAvatar slot="start">
                            <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />

                        </IonAvatar>
                        <IonLabel>
                            <h2>{searchText}</h2>
                            <p>fgaapld@coco.com</p>
                        </IonLabel>
                        <IonButton color="success" size="default">Ajouter</IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default ContactAddUserModal













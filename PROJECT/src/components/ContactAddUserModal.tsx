import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const ContactAddUserModal: React.FC<{ showModal: boolean,setShowModal: (value: boolean) => void }> = (props) => {
    const [searchData, setSearchData] = useState<firebase.firestore.DocumentData[]>([])
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (searchText.length >= 3) {
            firebase.firestore().collection('Users').orderBy('email').startAt(searchText).endAt(searchText + "\uf8ff").get()
                .then((res) => {
                    setSearchData(res.docs)
                })
        }
    })

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
                {
                    searchData.map( (value, key) => {
                        return (
                    
                            <IonItem key={key}>
                                <IonAvatar slot="start">
                                    <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>{value.data()?.username}</h2>
                                    <p>{value.data()?.email}</p>
                                </IonLabel>
                                <IonButton color="success" size="default">Ajouter</IonButton>
                            </IonItem>
                        )
                    })
                }
                </IonList>
            </IonContent>
        </IonModal>
    );
};

export default ContactAddUserModal













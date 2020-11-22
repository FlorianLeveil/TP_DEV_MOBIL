import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../data/app-context';
import defaultProfile from '../../assets/defaultProfile.jpg';
import firebase from '../../firebase';

import { closeOutline } from 'ionicons/icons';

const ContactAddUserModal: React.FC<{ showModal: boolean,setShowModal: (value: boolean) => void }> = (props) => {
    const appCtx = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<firebase.firestore.DocumentData[]>([])
    const [searchText, setSearchText] = useState('');
    const [searchOpti, setSearchOpti] = useState('email');

    setTimeout(() => {
        setShowLoading(false);
    }, 1000);

    useEffect(() => {
        firebase.firestore().collection('Users').orderBy(searchOpti).get()
            .then((res) => {
                setSearchData(res.docs)
            })
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (searchText.length >= 3) {
            firebase.firestore().collection('Users').orderBy(searchOpti).startAt(searchText).endAt(searchText + "\uf8ff").get()
                .then((res) => {
                    setSearchData(res.docs)
                })
        } else {
            firebase.firestore().collection('Users').orderBy(searchOpti).get()
                .then((res) => {
                    setSearchData(res.docs)
                })
        }
    }, [searchText, searchOpti])

    return (
        <>
            <IonModal isOpen={props.showModal} backdropDismiss={false}>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonGrid>
                            <IonRow>
                                <IonCol size="10">
                                    <IonTitle class="ion-text-center">Recherche Contact</IonTitle>
                                </IonCol>
                                <IonCol size="2">
                                    <IonButton onClick={() => {
                                        props.setShowModal(false)
                                        setSearchData([])
                                    }}>
                                        <IonIcon slot="icon-only" icon={ closeOutline } />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size="9">
                                    <IonSearchbar autocorrect="off" onIonChange={e => setSearchText(e.detail.value!)} showCancelButton='focus'></IonSearchbar>
                                </IonCol>
                                <IonCol size="3">
                                    <IonSelect cancelText="Retour" interface='action-sheet' value={searchOpti} onIonChange={e => setSearchOpti(e.detail.value)}>
                                        <IonSelectOption value="email">Email</IonSelectOption>
                                        <IonSelectOption value="username">Pseudo</IonSelectOption>
                                    </IonSelect>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                    {
                        searchData.map((value) => {
                            return (
                                <IonItem key={value.data().uid}>
                                    <IonAvatar slot="start">
                                        <img alt='Profile' src={value.data()?.picture ? value.data()?.picture : defaultProfile} />
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>
                                            {
                                                appCtx.user!.uid === value.data().uid ? value.data()?.username + ' (Moi)' : value.data()?.username
                                            }
                                        </h2>
                                        <p>{value.data()?.email}</p>
                                    </IonLabel>
                                    <IonButton disabled={
                                                    appCtx.contacts.contactList.includes(value.data().uid) ||
                                                    appCtx.contacts.myPendingList.includes(value.data().uid) ||
                                                    appCtx.contacts.blockedList.includes(value.data().uid) ||
                                                    appCtx.contacts.otPendingList.includes(value.data().uid) ||
                                                    appCtx.user!.uid === value.data().uid
                                                } color="success" size="default" onClick={() => {
                                        setShowLoading(true);
                                        appCtx.addContact(value.data()?.uid);
                                        setSearchData([]);
                                        props.setShowModal(false);
                                    }} >
                                        Ajouter
                                    </IonButton>
                                </IonItem>
                            )
                        })
                    }
                    </IonList>
                </IonContent>
            </IonModal>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={2000}
            />
        </>
    );
};

export default ContactAddUserModal

import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonLoading, IonModal, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../data/app-context';
import defaultProfile from '../assets/defaultProfile.jpg';
import firebase from '../firebase';


const NewMessageModal: React.FC<{ showModal: boolean,setShowModal: (value: boolean) => void }> = (props) => {
    const appCtx = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<firebase.firestore.DocumentData[]>([])
    const [searchText, setSearchText] = useState('');

    setTimeout(() => {
        setShowLoading(false);
    }, 1000);

    useEffect(() => {
        if (searchText.length >= 1) {
            firebase.firestore().collection('Users').orderBy('username').startAt(searchText).endAt(searchText + "\uf8ff").get()
                .then((res) => {
                    setSearchData(res.docs)
                })
        }
    }, [searchText])
 

    const fillResults = () => {
        if ( searchData.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Aucun résultats :'(
                    </IonLabel>
                </IonItem>

            )
        } else {
            return searchData.map((value) => {
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
    }

    return (
        <>
            <IonModal isOpen={props.showModal} backdropDismiss={false}>
                <IonHeader translucent>
                    <IonToolbar>
                            <IonTitle>Recherche Contact</IonTitle>
                            <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                props.setShowModal(false)
                                setSearchData([])
                            }}>Retour</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonSearchbar autocorrect="off" onIonChange={e => setSearchText(e.detail.value!)} showCancelButton='focus'></IonSearchbar>

                <IonContent fullscreen>
                    <IonList>
                    {
                        fillResults()
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

export default NewMessageModal

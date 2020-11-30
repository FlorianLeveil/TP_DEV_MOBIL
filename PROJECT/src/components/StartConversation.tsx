import { IonAvatar, IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonModal, IonRadio, IonRadioGroup, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../data/app-context';
import defaultProfile from '../assets/defaultProfile.jpg';
import firebase from '../firebase';
//eslint-disable-next-line
import { checkConv } from '../helpers/convHelper';
import { sendSharp } from 'ionicons/icons';


const StartConversation: React.FC<{ showModal: boolean,setShowModal: (value: boolean) => void }> = (props) => {
    const appCtx = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<firebase.firestore.DocumentData[]>([]);
    const [messageValue, setMessageValue] = useState<string>("");
    const [contact, setContact] = useState<string>("");

    useEffect(() => {
        if (!appCtx.userdata.contact) {
            setSearchData([]);
            return;
        }
        firebase.firestore().collection("Contacts").doc(appCtx.userdata.contact)
            .onSnapshot((res) => {
                let contactList: [] = res.data()?.contactList;
                let resList: firebase.firestore.DocumentData[] = [];
                contactList.forEach( async (contact) => {
                    await firebase.firestore().collection('Users').doc(contact).get()
                        .then((res2) => {
                            resList.push(res2);
                        })
                })

                setSearchData(resList);
            })
    //eslint-disable-next-line
    }, [])

    const handleCreateConv = (msgValue: string) => {
        try {
            appCtx.startConv(contact, msgValue);
            setContact("");
            setMessageValue("");
        } catch (error) {
            console.log("Error in start conversation : ", error);
        }
    }

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
            return searchData.map((value) => (
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
                    
                    <IonRadio value={value.data().uid} />
                </IonItem>
            ))
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
                            }}>Retour</IonButton>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        <IonRadioGroup onIonChange={(e) => setContact(e.detail.value)}>
                            {
                                fillResults()
                            }
                        </IonRadioGroup>
                    </IonList>
                </IonContent>

                <IonFooter>
                    <IonSearchbar placeholder="Enter a gentle message" value={messageValue} onIonChange={e => setMessageValue(e.detail.value!)}>
                        <IonButton onClick={() => handleCreateConv(messageValue)} size="large" fill="clear" ><IonIcon color="primary" slot="icon-only" icon={ sendSharp } /></IonButton>
                    </IonSearchbar>
                </IonFooter>
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

export default StartConversation

import { IonButton, IonContent, IonFooter, IonHeader, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { Group } from '../../data/app-context';
import firebase from "../../firebase";

interface oui {
    [key: string]: firebase.firestore.DocumentData;
}

const GroupInformationItem: React.FC<{action: string, text: string, group: Group}> = (props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const appCtx = useContext(AppContext);
    const [usrList, setUsrList] = useState<string[]>([]);
    const [contactList, setContactList] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        setContactList([]);
        appCtx.contacts.contactList.forEach( async (user) => {
            await firebase.firestore().collection("Users").doc(user).get()
                .then((res) => {
                    setContactList((prevState) => {
                        let newList = [...prevState];
                        newList.push(res);
                        return newList;
                    })
                })
        });
    // eslint-disable-next-line
    }, [appCtx.contacts.contactList])

    const whatToDisplay = () => {
        switch (props.action) {
            case "addUser":
                return (
                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={() => {setShowModal(false)}}
                    >
                        <IonHeader translucent>
                            <IonToolbar>
                                    <IonTitle>Add User</IonTitle>
                                    <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                        setShowModal(false)
                                    }}>Retour</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>
                            
                        </IonContent>
                        <IonFooter>

                        </IonFooter>
                    </IonModal>
                )
            case "remUser":
                return (
                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={() => {setShowModal(false)}}
                    >
                        <IonHeader translucent>
                            <IonToolbar>
                                    <IonTitle>Remove User</IonTitle>
                                    <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                        setShowModal(false)
                                    }}>Retour</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>

                        </IonContent>
                        <IonFooter>
                            
                        </IonFooter>
                    </IonModal>
                )
            case "eleUser":
                return (
                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={() => {setShowModal(false)}}
                    >
                        <IonHeader translucent>
                            <IonToolbar>
                                    <IonTitle>Elevate User</IonTitle>
                                    <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                        setShowModal(false)
                                    }}>Retour</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>

                        </IonContent>
                        <IonFooter>
                            
                        </IonFooter>
                    </IonModal>
                )
            case "retUser":
                return (
                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={() => {setShowModal(false)}}
                    >
                        <IonHeader translucent>
                            <IonToolbar>
                                    <IonTitle>Retrograde User</IonTitle>
                                    <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                        setShowModal(false)
                                    }}>Retour</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>

                        </IonContent>
                        <IonFooter>
                            
                        </IonFooter>
                    </IonModal>
                )
            case "delConv":
                return (
                    <IonModal
                        isOpen={showModal}
                        onDidDismiss={() => {setShowModal(false)}}
                    >
                        <IonHeader translucent>
                            <IonToolbar>
                                    <IonTitle>Delete groupe</IonTitle>
                                    <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                        setShowModal(false)
                                    }}>Retour</IonButton>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent>

                        </IonContent>
                        <IonFooter>
                            
                        </IonFooter>
                    </IonModal>
                )
        }
    }

    return (
        <IonItem onClick={() => {setShowModal(true)}}>
            <IonLabel>
                {props.text}
            </IonLabel>
            {
                whatToDisplay()
            }
        </IonItem>
    )
}

export default GroupInformationItem
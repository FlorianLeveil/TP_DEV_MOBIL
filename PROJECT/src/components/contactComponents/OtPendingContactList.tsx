import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react'
import firebase from 'firebase';
import 'firebase/firebase';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../../assets/defaultProfile.jpg';
import AppContext from '../../data/app-context';

import { checkmarkOutline, closeOutline } from 'ionicons/icons';

const OtPendingContactList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [otContactList, setContactList] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        setContactList([]);
        appCtx.contacts.otPendingList.forEach( async (user) => {
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
    }, [appCtx.contacts.otPendingList])

    const showOtPendingList = () => {
        if ( otContactList.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Aucunes demandes pour l'instant.
                    </IonLabel>
                </IonItem>
            )
        } else {
            return otContactList.map( (value) => {
                return (
                    <IonItem key={value.data().uid}>
                        <IonAvatar slot="start">
                            <img alt='Profile' src={value.data()?.picture ? value.data()?.picture : defaultProfile} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{value.data()?.username}</h2>
                            <p>{value.data()?.email}</p>
                        </IonLabel>
                        <IonButton size="large" fill="clear" color='success' onClick={() => appCtx.addContact(value.data().uid)} >
                            <IonIcon size="large" slot='icon-only' icon={checkmarkOutline} color='success' />
                        </IonButton>
                        <IonButton size="large" fill="clear" color='danger' onClick={() => appCtx.refuseInvite(value.data().uid)} >
                            <IonIcon size="large" slot='icon-only' icon={closeOutline} color='danger' />
                        </IonButton>
                    </IonItem>
                )
            })
        }
    }

    return (
        <IonList>
            <IonListHeader>
                <IonLabel>Demande(s) de contact</IonLabel>
            </IonListHeader>
            {
                showOtPendingList()
            }
        </IonList>
    )
}

export default OtPendingContactList
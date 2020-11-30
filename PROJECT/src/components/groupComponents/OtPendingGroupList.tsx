import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react'
import firebase from '../../firebase';
import 'firebase/firebase';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../../assets/defaultProfile.jpg';
import AppContext from '../../data/app-context';

import { checkmarkOutline, closeOutline } from 'ionicons/icons';

const OtPendingGroupList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [otGroupList, setGroupList] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        setGroupList([]);
        appCtx.contacts.otPendingList.forEach( async (user) => {
            await firebase.firestore().collection("Users").doc(user).get()
                .then((res) => {
                    setGroupList((prevState) => {
                        let newList = [...prevState];
                        newList.push(res);
                        return newList;
                    })
                })
        });
    // eslint-disable-next-line
    }, [appCtx.contacts.otPendingList])

    const showOtPendingList = () => {
        if ( otGroupList.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Aucunes demandes pour l'instant.
                    </IonLabel>
                </IonItem>
            )
        } else {
            return otGroupList.map( (value) => {
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

export default OtPendingGroupList
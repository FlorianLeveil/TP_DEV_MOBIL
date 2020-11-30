import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonLoading } from '@ionic/react'
import firebase from '../../firebase';
import { closeOutline } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../../assets/defaultProfile.jpg';
import AppContext from '../../data/app-context';

const MyPendingGroupList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    // const [contactList, setContactList] = useState<firebase.firestore.DocumentData[]>([]);
    const groupList = [{uuid : 'azfydkguhzjmkedebkfv', data : {picture : "", groupname : "test"}}]
    // useEffect(() => {
        // setContactList([]);
        // appCtx.groups.myPendingList.forEach( async (user) => {
        //     await firebase.firestore().collection("Users").doc(user).get()
        //         .then((res) => {
        //             setContactList((prevState) => {
        //                 let newList = [...prevState];
        //                 newList.push(res);
        //                 return newList;
        //             })
        //         })
        // });
    // eslint-disable-next-line
    // }, [appCtx.groups.myPendingList])

    const showMyPendingGroupList = () => {
        if ( groupList.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Aucunes demandes pour l'instant  
                    </IonLabel>
                </IonItem>
            )
        } else {
            return groupList.map( (value) => {
                return (
                    <IonItem key={value.uuid}>
                        <IonAvatar slot="start">
                            <img alt='Profile' src={value.data.picture ? value.data.picture : defaultProfile} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{value.data.groupname}</h2>
                            <p>{value.uuid}</p>
                        </IonLabel>
                        <IonButton size="large" fill="clear" color='danger' >
                            <IonIcon size="large" slot='icon-only' icon={closeOutline} color='danger' />
                        </IonButton>
                    </IonItem>
                )
            })
        }
    }

    return (
        <>
            <IonList>
                <IonListHeader>
                    <IonLabel>Demande(s) de contact envoyé</IonLabel>
                </IonListHeader>
                {
                    showMyPendingGroupList()
                }
            </IonList>
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={500}
            />
        </>
    )
}

export default MyPendingGroupList
import { IonAvatar, IonButton, IonItem, IonLabel, IonList, IonListHeader, IonLoading } from '@ionic/react'
import firebase from '../../firebase';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../../assets/defaultProfile.jpg';
import AppContext from '../../data/app-context';
import ContactAddUserModal from '../contactComponents/ContactAddUserModal';

const GroupList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [groupList, setGroupList] = useState<firebase.firestore.DocumentData[]>([]);

    // useEffect(() => {
    //     setGroupList([]);
    //     appCtx.groups.contactList.forEach( async (user) => {
    //         await firebase.firestore().collection("Users").doc(user).get()
    //             .then((res) => {
    //                 setGroupList((prevState) => {
    //                     let newList = [...prevState];
    //                     newList.push(res);
    //                     return newList;
    //                 })
    //             })
    //     });
    // // eslint-disable-next-line
    // }, [appCtx.groups.groupList])

    const showGroupList = () => {
        if ( groupList.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Pas encore de contact :( 
                    </IonLabel>
                </IonItem>
            )
        } else {
            return groupList.map( (value) => {
                return (
                    <IonItem key={value.data().uid}>
                        <IonAvatar slot="start">
                            <img alt='Profile' src={value.data()?.picture ? value.data()?.picture : defaultProfile} />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{value.data()?.username}</h2>
                            <p>{value.data()?.email}</p>
                        </IonLabel>
                        <IonButton color="danger" size="default" onClick={() => {
                            setShowLoading(true);
                            appCtx.removeContact(value.data()?.uid)
                        }}>Supprimer</IonButton>
                    </IonItem>
                )
            })
        }
    }

    return (
        <>
            <ContactAddUserModal showModal={showModal} setShowModal={setShowModal}/>
            <IonList>
                <IonListHeader >
                    <IonLabel>Liste des contact(s)</IonLabel>
                </IonListHeader>
                {
                    showGroupList()
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

export default GroupList
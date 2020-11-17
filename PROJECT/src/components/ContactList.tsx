import { IonAvatar, IonButton, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react'
import firebase from 'firebase';
import 'firebase/firebase';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { Contact } from '../data/app-context';

const ContactList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const [contactList, setContactList] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        setContactList([]);
        appCtx.contacts.contactList.forEach((user) => {
            firebase.firestore().collection("Users").doc(user).get()
                .then((res) => {
                    setContactList((prevState) => {
                        let newList = [...prevState];
                        newList.push(res);
                        return newList;
                    })
                })
        });
    }, [])

    return (
        <IonList>
            <IonListHeader>
                <IonTitle>Liste des contacts</IonTitle>
            </IonListHeader>
            {
                contactList.map( (value, key) => {
                    return (
                        <IonItem key={key}>
                            <IonAvatar slot="start">
                                <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{value.data()?.username}</h2>
                                <p>{value.data()?.email}</p>
                            </IonLabel>
                            <IonButton color="danger" size="default">Supprimer</IonButton>
                        </IonItem>
                    )
                })
            }
        </IonList>
        
    )
}

export default ContactList
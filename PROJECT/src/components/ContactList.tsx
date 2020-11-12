import { IonAvatar, IonButton, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react'
import React, { useContext } from 'react';
import firebase from '../firebase';

import AppContext from '../data/app-context';

/* <IonItem>
    <IonAvatar slot="start">
    <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
    </IonAvatar>
    <IonLabel>
        <h2>Florian</h2>
        <p>fgaara@live.fr</p>
    </IonLabel>
    <IonButton color="danger">Supprimer</IonButton>
</IonItem> */

const ContactList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const contacts = ['user1', 'user2', 'user3', 'user4', 'user5'];

    

    return (
        <IonList class='ion-padding ion-margin'>
            <IonListHeader>
                <IonTitle>Liste des contacts</IonTitle>
            </IonListHeader>
            {
                contacts.map( (name, key) => {
                    return (
                        <IonItem>
                            <IonAvatar slot="start">
                                <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{name}</h2>
                                <p>fgaara@live.fr</p>
                            </IonLabel>
                            <IonButton color="danger" key={key}>Supprimer</IonButton>
                        </IonItem>
                    )
                })
            }
        </IonList>
    )
}

export default ContactList
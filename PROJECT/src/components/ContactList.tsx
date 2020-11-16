import { IonAvatar, IonButton, IonItem, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react'
import React from 'react';

const ContactList: React.FC = () => {
    const contacts = ['user1', 'user2', 'user3', 'user4', 'user5'];

    return (
        <IonList>
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
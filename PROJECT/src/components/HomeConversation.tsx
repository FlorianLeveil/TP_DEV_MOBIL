import { IonAvatar, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote } from '@ionic/react'
import React from 'react';

import { ROUTE_CONVERSATION } from '../nav/Routes';


const HomeConversation: React.FC = () => {
    let contacts = [{user: 'user1', last_message: 'Toto1',date_last_message:'10-10-2020-15:60:30', new_message: 0},
                    {user: 'user2', last_message: 'Toto2',date_last_message:'10-10-2020-15:60:30', new_message: 5},
                    {user: 'user3', last_message: 'Toto3',date_last_message:'10-10-2020-15:60:30', new_message: 0},
                    {user: 'user4', last_message: 'Toto4',date_last_message:'10-10-2020-15:60:30', new_message: 10},
                    {user: 'user5', last_message: 'Toto5',date_last_message:'10-10-2020-15:60:30', new_message: 0}];

    contacts.sort(function (a, b) {
        return b.new_message - a.new_message;
    });

    return (
        <IonList>
            {
                contacts.map( (name) => {
                    return (
                        <IonItemSliding key={name.user.toString()}>
                            <IonItem routerLink={ROUTE_CONVERSATION}>
                                <IonAvatar slot="start">
                                <img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>{name.user}</h2>
                                    <p>{name.date_last_message}</p>
                                    <p>{name.last_message}</p>
                                </IonLabel>
                            <IonNote slot="end" color="primary">{name.new_message}</IonNote>
                            </IonItem>
                            <IonItemOptions side="start">
                                <IonItemOption color="primary">Mark Unread</IonItemOption >
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="danger">Delete</IonItemOption >
                            </IonItemOptions>
                        </IonItemSliding>
                    )
                })
            }
        </IonList>
    )
}


export default HomeConversation
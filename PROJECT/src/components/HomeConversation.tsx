import { IonAvatar, IonItem, IonItemSliding, IonLabel, IonList, IonNote } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import defaultProfile from '../assets/defaultProfile.jpg';
import AppContext from '../data/app-context';
import firebase from '../firebase';
import { fromDate } from '../helpers/dateHelper';

import { ROUTE_CONVERSATION } from '../nav/Routes';

interface oui {
    [key: string]: firebase.firestore.DocumentData;
}

const HomeConversation: React.FC = () => {
    const appCtx = useContext(AppContext);
    const history = useHistory();
    const db = firebase.firestore();
    const [users, setUsers] = useState<oui>({});

    useEffect(() => {
        db.collection("Conversations")
            .where("users", "array-contains", appCtx.userdata.uid)
            .onSnapshot(async (docs) => {
                let listUsers: oui = {};
                for(const doc of docs.docs) {
                    await db.collection('Users').doc(doc.data().users.filter((value: string) => { return value !== appCtx.user?.uid })[0]).get()
                        .then((res) => {
                            listUsers[doc.data().convId] = res.data()!;
                        });
                }

                setUsers(listUsers);
            })
    //eslint-disable-next-line
    }, [])

    const handleRoute = (convId: string) => {
        history.push(ROUTE_CONVERSATION + convId)
    }

    const convs = () => {
        if ( Object.keys(users).length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Let's start writing a good story :)
                    </IonLabel>
                </IonItem>
            )
        } else {
            return appCtx.conversations.map((conv, index) => {
                let user = users[conv.convId];
                // eslint-disable-next-line array-callback-return
                if (user === undefined) return;

                return (
                    <IonItemSliding key={index} onClick={() => handleRoute(conv.convId)}>
                        <IonItem routerLink={ROUTE_CONVERSATION}>
                            <IonAvatar slot="start">
                            <img alt='Profile' src={user.picture ? user.picture : defaultProfile} />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{user.username}</h2>
                                <p>{conv.lastMessage.message}</p>
                            </IonLabel>
                            <IonLabel>
                                <em>{ fromDate(conv.lastMessage.sendedAt.seconds) }</em>
                            </IonLabel>
                            <IonNote slot="end" color="primary">{index}</IonNote>
                        </IonItem>
                    </IonItemSliding>
                )
            })
        }
    }

    return (
        <>
            {/* <IonLoading
                isOpen={loading}
                message="Loading your conversations"
            /> */}
            <IonList>
                {
                    convs()
                }
            </IonList>
        </>
    )
}


export default HomeConversation
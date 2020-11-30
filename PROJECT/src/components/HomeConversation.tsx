import { IonAvatar, IonItem, IonItemSliding, IonLabel, IonList, IonNote } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import defaultProfile from '../assets/defaultProfile.jpg';
import AppContext from '../data/app-context';
import firebase from '../firebase';
import { fromDate } from '../helpers/dateHelper';

import { ROUTE_CONVERSATION } from '../nav/Routes';

const HomeConversation: React.FC = () => {
    const appCtx = useContext(AppContext);
    const history = useHistory();
    const db = firebase.firestore();
    const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
    const [messages, setMessages] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        db.collection("Conversations").where("users", "array-contains", appCtx.userdata.uid)
            .onSnapshot((docs) => {
                let listUsers: firebase.firestore.DocumentData[] = [];
                let listMessages: firebase.firestore.DocumentData[] = [];
                docs.forEach((doc) => {
                    db.collection('Users').doc(doc.data().users.filter((value: string) => { return value !== appCtx.user?.uid })[0]).get()
                        .then((res) => {
                            listUsers.push(res);
                        });
        
                    db.collection('Messages').doc(doc.data().lastMessage)
                        .onSnapshot((res) => {
                            listMessages.push(res)
                        });

                    console.log("[IN FOREACH] Gets here for : ", listUsers, listMessages)
                })

                setUsers(listUsers);
                setMessages(listMessages);
                
                console.log("[OUT FOREACH IN SNAP]Gets here for : ", users, messages);
            })
    //eslint-disable-next-line
    }, [])

    const handleRoute = (convId: string) => {
        history.push(ROUTE_CONVERSATION + convId)
    }

    const convs = () => {
        if ( users.length === 0 || messages.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Let's start writing a good story :)
                    </IonLabel>
                </IonItem>
            )
        } else {
            return appCtx.conversations.map((conv, index) => {
                let user = users[index]
                let msg = messages[index]
                return (
                    <IonItemSliding key={index} onClick={() => handleRoute(conv.convId)}>
                        <IonItem routerLink={ROUTE_CONVERSATION}>
                            <IonAvatar slot="start">
                            <img alt='Profile' src={user.data()?.picture ? user.data()?.picture : defaultProfile} />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{user.data().username}</h2>
                                <p>{msg.data()?.message}</p>
                            </IonLabel>
                            <IonLabel>
                                <em>{ fromDate(msg.data().sendedAt.seconds) }</em>
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
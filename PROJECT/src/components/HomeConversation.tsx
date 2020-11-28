import { IonAvatar, IonItem, IonItemSliding, IonLabel, IonList, IonLoading, IonNote } from '@ionic/react'
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
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
    const [messages, setMessages] = useState<firebase.firestore.DocumentData[]>([]);

    useEffect(() => {
        setMessages([]);
        
        appCtx.conversations.map(async (conv) => {
            setLoading(true);
            await db.collection('Users').doc(conv.users.filter((value) => { return value !== appCtx.user?.uid })[0]).get()
                .then((res) => {
                    if (!users.includes(res)) {
                        setUsers((prevState) => {
                            prevState.push(res);
                            return prevState;
                        })
                    }
                })

            await db.collection('Messages').doc(conv.lastMessage).get()
                .then((res) => {
                    if (!users.includes(res)) {
                        setMessages((prevState) => {
                            prevState.push(res);
                            return prevState;
                        })
                    }
                })

            if (appCtx.conversations.indexOf(conv) === appCtx.conversations.length-1) {
                setLoading(false);
            }
        })
    //eslint-disable-next-line
    }, [])

    const handleRoute = (convId: string) => {
        history.push(ROUTE_CONVERSATION + convId)
    }

    const not = () => {
        return(
            ""
        )
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
                    <IonItemSliding key={conv.convId} onClick={() => handleRoute(conv.convId)}>
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
            <IonLoading
                isOpen={loading}
                message="Loading your conversations"
            />
            <IonList>
                {
                    loading ? not() : convs()
                }
            </IonList>
        </>
    )
}


export default HomeConversation
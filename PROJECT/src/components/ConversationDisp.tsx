import firebase from '../firebase';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AppContext, { Conversation, defaultUserData, Message, UserData } from '../data/app-context';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonSearchbar, IonTitle } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';

const ConversationDisp: React.FC = () => {
    const appCtx = useContext(AppContext);
	const { id } = useParams<{id: string}>();
	const db = firebase.firestore();
	const [loading, setLoading] = useState<boolean>(true);
	const [conv, setConv] = useState<Conversation>( appCtx.conversations.filter((value) => { return value.convId === id })[0] as Conversation );
	const [messageValue, setMessageValue] = useState<string>("");
	const [alterUser, setAlterUser] = useState<UserData>(defaultUserData);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		db.collection("Conversations").doc(id).get()
			.then( async (res) => {

				// CONSOLE LOG DATA
				setConv(res.data() as Conversation);

				// SETUP OTHER USER DATA
				await db.collection("Users").doc(res.data()?.users.filter((value:string) => { return value !== appCtx.userdata.uid })[0]).get()
					.then((res) => {
						setAlterUser(res.data() as UserData);
					})

                // // LOAD MESSAGES
                // await db.collection("Messages").where("convId", "==", conv.convId).orderBy("sendedAt", "asc")
                //     .onSnapshot(function(querySnapshot) {
                //         querySnapshot.forEach(function(doc) {
                //             if (messages.includes(doc.data() as Message)) {
                //                 console.log("Already in");
                //             } else {
                //                 setMessages((prevState) => {
                //                     prevState.push(doc.data() as Message);
                //                     return prevState;
                //                 });
                //                 console.log("Adding message")
                //             }
                            
                //         });
                //     });
				await db.collection("Messages").where("convId", "==", conv.convId).orderBy("sendedAt", "asc").get()
					.then((docs) => {
						docs.docs.forEach((msg) => {
							setMessages((prevState) => {
								prevState.push(msg.data() as Message)
								return prevState;
							})
						})
					})

				setLoading(false);
			}).catch((err) => {
				console.log(err)
			})

	//eslint-disable-next-line
	}, [conv.convId])

	// useEffect(() => {
    //     setLoading(true);
	// 	setLoading(false);
	// }, [conv.messages])

	const loadMessages = () => {
		if ( messages.length === 0 ) {
			return (
				<IonItem>
					No messages
				</IonItem>
			)
		} else {
			return messages.map((msg: Message, index) => {
				return (
                    <IonItem key={msg.sendedAt.toString()}>
                        <IonLabel slot={msg.senderId === appCtx.userdata.uid ? 'end' : 'start'} className={msg.senderId === appCtx.userdata.uid ? 'ion-text-right' : 'ion-text-left'} color={msg.senderId === appCtx.userdata.uid ? 'primary' : 'black'}>
                            {msg.message}
                        </IonLabel>
                    </IonItem>
				)
			})
		}
	}

	const handleSendMessage = (convId: string, message: string) => {
		appCtx.sendMessage(convId, message);
		setMessageValue('');
	}

	return (
		<>
			<IonLoading
				isOpen={loading}
				message="Loading your messages"
			/>
			<IonHeader translucent className="ion-text-center ion-toolbar-transparent ion-padding">
				<IonTitle>
					{alterUser.username}
				</IonTitle>
			</IonHeader>
			<IonContent>
				<IonList className="ion-no-border ion-margin">
					{
						loadMessages()
					}
				</IonList>
			</IonContent>
			<IonFooter id='custFooter' className='ion-padding' style={{"backgroundColor":"var(--ion-color-primary)"}}>
				<IonSearchbar placeholder="Enter a gentle message" value={messageValue} onIonChange={e => setMessageValue(e.detail.value!)}>
				    <IonButton onClick={() => handleSendMessage(conv.convId, messageValue)} size="large" fill="clear" ><IonIcon color="light" slot="icon-only" icon={ sendSharp } /></IonButton>
				</IonSearchbar>
			</IonFooter>
		</>
	);
}

export default ConversationDisp
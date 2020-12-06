import firebase from '../firebase';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { Conversation, defaultUserData, Message, UserData } from '../data/app-context';
import { IonButton, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonTitle } from '@ionic/react';
import { arrowDownCircle, sendSharp } from 'ionicons/icons';

const ConversationDisp: React.FC<{id: string}> = (props) => {
    const appCtx = useContext(AppContext);
	const db = firebase.firestore();
	const [loading, setLoading] = useState<boolean>(true);
	const [conv, setConv] = useState<Conversation>( appCtx.conversations.filter((value) => { return value.convId === props.id })[0] as Conversation );
	const [messageValue, setMessageValue] = useState<string>("");
	const [alterUser, setAlterUser] = useState<UserData>(defaultUserData);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		setLoading(true);
		
		try {
			db.collection("Conversations").doc(props.id).get()
			.then( async (res) => {
				// SET CONV DATA
				setConv(res.data() as Conversation);

				// SETUP OTHER USER DATA
				db.collection("Users").doc(res.data()?.users.filter((value:string) => { return value !== appCtx.userdata.uid })[0])
					.onSnapshot((res) => {
						setAlterUser(res.data() as UserData);
					})

				db.collection('Messages').where("convId", "==", props.id).orderBy("sendedAt", "asc")
                    .onSnapshot(function (querySnapshot) {
                        let listMessages: Message[] = [];
                        querySnapshot.forEach(function (doc) {
                            listMessages.push(doc.data() as Message);
                        });
                        setMessages(listMessages);
                    });
			})
		} catch (error) {
			console.log("Error from ConversationDisp : ", error)
		}

		setLoading(false);
	//eslint-disable-next-line
	}, [props.id])

	const loadMessages = () => {
		if ( messages.length === 0 ) {
			return (
				<IonItem>
					No messages
				</IonItem>
			)
		} else {
			return messages.map((msg: Message, index) => {
				if (msg.senderId === appCtx.userdata.uid) {
                    return (
                        <IonItem key={index}>
                            <IonLabel slot='end' className='ion-text-right' color='primary'>
                                {msg.message}
                            </IonLabel>
                        </IonItem>
                    )
                } else if ( msg.senderId === "system") {
                    return (
                        <IonItem key={index}>
                            <IonLabel slot="center" className="ion-text-justify" color="warning">
                                {msg.message}
                            </IonLabel>
                        </IonItem>
                    )
                } else {
                    return (
                        <IonItem key={index}>
                            <IonLabel slot='start' className='ion-text-left' color='black'>
                                {msg.message}
                            </IonLabel>
                        </IonItem>
                    )
                }
			})
		}
	}

	const handleSendMessage = (convId: string, message: string) => {
		appCtx.sendMessage(convId, message.trim());
		setMessageValue('');
	}
	function scrollToBottom() {
		let list = document.querySelector("ion-content");
		return list && list.scrollToBottom();
	};
	return (
		<>
			<IonLoading
				isOpen={loading}
				message="Loading your messages"
			/>
			<IonFab vertical="center" horizontal="end" slot="fixed">
          		<IonFabButton size="small" onClick={() => scrollToBottom()}>
            		<IonIcon icon={arrowDownCircle} />
          		</IonFabButton>
        	</IonFab>
			<IonHeader translucent className="ion-text-center ion-toolbar-transparent ion-padding">
				<IonTitle>
					{alterUser.username}
				</IonTitle>
			</IonHeader>
			<IonContent>
				<IonList className="ion-no-border ion-margin reorder-list-active">
					{loadMessages()}
				</IonList>
			</IonContent>
			<IonFooter id='custFooter' className='ion-padding' style={{"backgroundColor":"var(--ion-color-primary)"}}>
				<form>
					<IonItem>
						<IonLabel>Message : </IonLabel>
						<IonInput placeholder="Enter a gentle message" value={messageValue} onIonChange={(e) => setMessageValue(e.detail.value!)} />
					</IonItem>
					<IonItem>
						<IonButton disabled={!(messageValue.trim().length > 1)} onClick={() => handleSendMessage(conv.convId, messageValue)} size="large" fill="clear">
							<IonIcon slot="icon-only" icon={sendSharp} />
						</IonButton>
					</IonItem>
				</form>
			</IonFooter>
		</>
	);
}

export default ConversationDisp
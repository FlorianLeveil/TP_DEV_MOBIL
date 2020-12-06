import firebase from '../../firebase';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { Group, Message } from '../../data/app-context';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonTitle } from '@ionic/react';
import { sendSharp } from 'ionicons/icons';

interface oui {
    [key: string]: firebase.firestore.DocumentData;
}

const GroupConv: React.FC<{id: string, isValid: boolean}> = (props) => {
    const appCtx = useContext(AppContext);
	const db = firebase.firestore();
	const [loading, setLoading] = useState<boolean>(true);
	const [group, setGroup] = useState<Group>( appCtx.groups.filter((value) => { return value.groupId === props.id })[0] as Group );
	const [messageValue, setMessageValue] = useState<string>("");
	const [users, setUsers] = useState<oui>({});
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		setLoading(true);
		db.collection("Groups").doc(props.id)
			.onSnapshot( async (res) => {
				// SET GROUP DATA
				setGroup(res.data() as Group);

				// SETUP OTHER USERS DATA
				let listUsers: oui = {};
                for(const doc of res.data()?.users) {
                    await db.collection('Users').doc(doc).get()
                        .then((res) => {
                            listUsers[doc] = res.data()!;
                        });
                }

                setUsers(listUsers);

				db.collection('Messages').where("convId", "==", group.groupId).orderBy("sendedAt", "asc")
                    .onSnapshot(function (querySnapshot) {
                        let listMessages: Message[] = [];
                        querySnapshot.forEach(function (doc) {
                            listMessages.push(doc.data() as Message);
                        });
                        setMessages(listMessages);
                    });
			})

		setLoading(false);
	//eslint-disable-next-line
	}, [])

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
                            <IonLabel slot="center" className="ion-text-justify" color="danger">
                                {msg.message}
                            </IonLabel>
                        </IonItem>
                    )
                } else {
                    const usr = users[msg.senderId]
                    return (
                        <IonItem key={index}>
                            <IonLabel slot='start' className='ion-text-left' color='black'>
                                {usr.username} : {msg.message}
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

	return (
		<>
			<IonLoading
				isOpen={loading}
				message="Loading your messages"
			/>
			<IonHeader translucent className="ion-text-center ion-toolbar-transparent ion-padding">
				<IonTitle>
					{group.groupName}
				</IonTitle>
			</IonHeader>
			<IonContent>
				<IonList className="ion-no-border ion-margin reorder-list-active">
					{
						loadMessages()
					}
				</IonList>
			</IonContent>
			<IonFooter id='custFooter' className='ion-padding' style={{"backgroundColor":"var(--ion-color-primary)"}}>
				<form>
					<IonItem>
						<IonLabel>Message : </IonLabel>
						<IonInput placeholder="Enter a gentle message" value={messageValue} onIonChange={(e) => setMessageValue(e.detail.value!)} />
					</IonItem>
					<IonItem>
						<IonButton disabled={!(messageValue.trim().length > 1)} onClick={() => handleSendMessage(group.groupId, messageValue)} size="large" fill="clear">
							<IonIcon slot="icon-only" icon={sendSharp} />
						</IonButton>
					</IonItem>
				</form>
			</IonFooter>
		</>
	);
}

export default GroupConv
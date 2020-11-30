import { IonAlert, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import firebase from '../firebase';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AppContext from '../data/app-context';
import ConversationDisp from '../components/ConversationDisp';
import { ROUTE_HOME } from '../nav/Routes';
import StartConversation from '../components/StartConversation';
import { add } from 'ionicons/icons';

const ConversationComp: React.FC = () => {
	const appCtx = useContext(AppContext);
	const history = useHistory();
	const { id } = useParams<{id: string}>();
	const db = firebase.firestore();
	const [showAlert, setShowAlert] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [alertText, setAlertText] = useState<string>("");

	useEffect(() => {
		try {
			db.collection('Conversations').doc(id).get()
				.then((res) => {
					if (!res.data()?.users.includes(appCtx.userdata.uid)) {
						setAlertText("Not part of the conversation");
						setShowAlert(true);
					}
				}).catch(() => {
					setAlertText("Wrong id :'(");
					setShowAlert(true);
				})
		} catch (e) {
			console.log(e);
		}
	//eslint-disable-next-line
	}, []);

	if (showAlert) {
		return (
			<IonAlert
				isOpen={showAlert}
				onDidDismiss={() => {setShowAlert(false); history.goBack()}}
				header={'Alert'}
				message={alertText}
				buttons={[
					{
						text: 'Home',
						handler: () => {
							setShowAlert(false);
							history.push(ROUTE_HOME);
						}
					},
					{
						text: 'Ok',
						handler: () => {
							setShowAlert(false);
							history.goBack();
						}
					}
				]}
			/>
		)
	} else {
		return (
			<IonPage>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
          			<IonFabButton onClick={() => setShowModal(true)}>
            			<IonIcon icon={add} />
          			</IonFabButton>
        		</IonFab>
				<StartConversation showModal={showModal} setShowModal={setShowModal}/>
				<ConversationDisp />
			</IonPage>
		)
	}
};

export default ConversationComp;

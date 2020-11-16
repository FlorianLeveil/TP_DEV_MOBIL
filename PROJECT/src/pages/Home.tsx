import { IonItemSliding,IonContent, IonPage, IonItem, IonLabel, IonItemOptions, IonItemOption, IonNote, IonList, IonListHeader, IonAvatar, IonModal, IonTitle, IonButton } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { ROUTE_CONVERSATION } from '../nav/Routes';
import './Home.css';
import "firebase/firestore";
import AppContext from '../data/app-context';
import ContactList from '../components/HomeConversation';
import HomeConversation from '../components/HomeConversation';


const Home: React.FC = () => {
	const [ showModal, setShowModal ] = useState<boolean>(false);
	const appCtx = useContext(AppContext);

	useEffect(() => {
		setShowModal(true);
	}, [appCtx]);

	return (
		<IonPage>
			<IonContent>
				<HomeConversation />
			</IonContent>
		</IonPage>
	);
};

export default Home;

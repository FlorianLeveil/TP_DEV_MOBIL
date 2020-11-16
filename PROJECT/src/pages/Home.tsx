import { IonContent, IonPage } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import "firebase/firestore";
import AppContext from '../data/app-context';
import HomeConversation from '../components/HomeConversation';


const Home: React.FC = () => {
	// eslint-disable-next-line
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

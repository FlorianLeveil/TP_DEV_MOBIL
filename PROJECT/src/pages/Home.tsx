import { IonContent, IonLoading, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import HomeConversation from '../components/HomeConversation';


const Home: React.FC = () => {
	// eslint-disable-next-line
	const [ showLoading, setShowLoading ] = useState<boolean>(true);

	return (
		<>
			<IonLoading
				isOpen={showLoading}
				onDidDismiss={() => setShowLoading(false)}
				backdropDismiss={false}
				spinner={"crescent"}
                message={"Please wait ..."}
                duration={2000}
			/>
			<IonPage>
				<IonContent>
						<HomeConversation />
				</IonContent>
			</IonPage>
		</>
	);
};

export default Home;

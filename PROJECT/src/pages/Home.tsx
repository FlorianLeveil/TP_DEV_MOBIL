import { IonContent, IonFab, IonFabButton, IonIcon, IonLoading, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import HomeConversation from '../components/HomeConversation';
import { add } from 'ionicons/icons';
import NewMessageModal from '../components/NewMessageModal';


const Home: React.FC = () => {
	// eslint-disable-next-line
	const [ showLoading, setShowLoading ] = useState<boolean>(true);
	const [showModal, setShowModal] = useState(false);

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
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton onClick={() => setShowModal(true)}>
							<IonIcon icon={add} />
          				</IonFabButton>
        			</IonFab>
					<NewMessageModal showModal={showModal} setShowModal={setShowModal}/>

				</IonContent>
			</IonPage>
		</>
	);
};

export default Home;

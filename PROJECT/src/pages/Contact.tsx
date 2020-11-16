import { IonAvatar, IonButton, IonCol, IonContent, IonModal, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, IonButtons, IonList, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import ContactAddUserModal from '../components/ContactAddUserModal';
import ContactList from '../components/ContactList';

const Contact: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<IonPage>
			<IonContent>
				<ContactAddUserModal showModal={showModal} setShowModal={setShowModal}/>
				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonButton expand="block" onClick={() => setShowModal(true)} color="success">Ajouter un contact</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<ContactList />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Contact;
	


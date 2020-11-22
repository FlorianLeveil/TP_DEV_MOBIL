import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import ContactAddUserModal from '../components/contactComponents/ContactAddUserModal';
import ContactList from '../components/contactComponents/ContactList';
import MyPendingContactList from '../components/contactComponents/MyPendingContactList';
import OtPendingContactList from '../components/contactComponents/OtPendingContactList';

const Contact: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<IonPage>
			<IonContent>
				<ContactAddUserModal showModal={showModal} setShowModal={setShowModal}/>
				<IonGrid className='ion-margin'>
					<IonRow>
						<IonCol></IonCol>
						<IonCol size="8">
							<IonButton expand="block" onClick={() => setShowModal(true)} color="success">Ajouter un contact</IonButton>
						</IonCol>
						<IonCol></IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<ContactList />
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<MyPendingContactList />
						</IonCol>
						<IonCol>
							<OtPendingContactList />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Contact;
	


import { IonAvatar, IonButton, IonCol, IonContent, IonModal, IonGrid, IonHeader, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, IonButtons, IonList, IonSearchbar } from '@ionic/react';
import React, { useState } from 'react';
import ContactList from '../components/ContactList';

const Contact: React.FC = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<IonPage>
			<IonContent>
				<IonModal isOpen={showModal} cssClass='my-custom-class'>
					<IonHeader translucent>
						<IonToolbar>
							<IonTitle>Recherche Contact</IonTitle>
							<IonButtons slot="end">
								<IonButton onClick={() => setShowModal(false)}>Close</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent fullscreen>
						<IonList>
							<IonItem>
								<IonAvatar slot="start">
									<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />

								</IonAvatar>
								<IonLabel>
									<h2>Jean</h2>
									<p>fgaapld@coco.com</p>
								</IonLabel>
								<IonButton color="success" size="default">Ajouter</IonButton>
							</IonItem>
							<IonItem>
								<IonAvatar slot="start">
									<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />

								</IonAvatar>
								<IonLabel>
									<h2>Pierre</h2>
									<p>fgaaro@po.fr</p>
								</IonLabel>
								<IonButton color="success" size="default">Ajouter</IonButton>
							</IonItem>
							<IonItem>
								<IonAvatar slot="start">
									<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
								</IonAvatar>
								<IonLabel>
									<h2>Florian</h2>
									<p>fgaara@live.fr</p>
								</IonLabel>
								<IonButton color="success" size="default">Ajouter</IonButton>
							</IonItem>
						</IonList>
					</IonContent>
				</IonModal>
				<IonGrid>
					<IonRow>
						<IonCol size="6">
							<IonSearchbar></IonSearchbar>
						</IonCol>
						<IonCol>
							<IonButton size="default" onClick={() => setShowModal(true)} color="success">Rechercher</IonButton>
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
	


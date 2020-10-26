import {
	IonAvatar,
	IonButton,
		IonCard,
		IonCardContent,
		IonCardHeader,
		IonCardSubtitle,
		IonCardTitle,
		IonCol,
		IonContent,
		IonFab,
		IonModal,
		IonFabButton,
		IonGrid,
		IonHeader,
		IonIcon,
		IonImg,
		IonInput,
		IonItem,
		IonItemOption,
		IonItemOptions,
		IonItemSliding,
		IonLabel,
		IonPage,
		IonRow,
		IonTitle,
		IonToolbar, IonButtons, IonList, IonSearchbar, IonNote, IonListHeader
	} from '@ionic/react';
	import React, { useState } from 'react';
	

	
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
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />

									</IonAvatar>
									<IonLabel>
										<h2>Jean</h2>
										<p>fgaapld@coco.com</p>
									</IonLabel>
									<IonButton color="success" size="default">Ajouter</IonButton>
								</IonItem>
								<IonItem>
									<IonAvatar slot="start">
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />

									</IonAvatar>
									<IonLabel>
										<h2>Pierre</h2>
										<p>fgaaro@po.fr</p>
									</IonLabel>
									<IonButton color="success" size="default">Ajouter</IonButton>
								</IonItem>
								<IonItem>
									<IonAvatar slot="start">
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
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
							<IonCol size="8">
								<IonSearchbar></IonSearchbar>
							</IonCol>
							<IonCol>
								<IonButton size="default" onClick={() => setShowModal(true)} color="success">Rechercher</IonButton>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonList>
									<IonListHeader>
										Contact
									</IonListHeader>
									<IonItem>
										<IonAvatar slot="start">
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
										</IonAvatar>
										<IonLabel>
											<h2>Florian</h2>
											<p>fgaara@live.fr</p>
										</IonLabel>
										<IonButton color="danger">Supprimer</IonButton>
									</IonItem>

									<IonItem>
										<IonAvatar slot="start">
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
										</IonAvatar>
										<IonLabel>
											<h2>Florian</h2>
											<p>fgaara@live.fr</p>
										</IonLabel>
										<IonButton color="danger">Supprimer</IonButton>
									</IonItem>

									<IonItem>
										<IonAvatar slot="start">
										<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
										</IonAvatar>
										<IonLabel>
											<h2>Florian</h2>
											<p>fgaara@live.fr</p>
										</IonLabel>
										<IonButton color="danger">Supprimer</IonButton>
									</IonItem>
								</IonList>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonContent>
			</IonPage>
		);
	};
	
	export default Contact;
	


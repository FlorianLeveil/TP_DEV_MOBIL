import {
	IonAvatar,
	IonButton,
	IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonListHeader,
	IonModal,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
  } from '@ionic/react';
import React, { useState } from 'react';
  

  
const Group: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
    return (
      <IonPage>
          	<IonContent>
			  <IonModal isOpen={showModal} cssClass='my-custom-class'>
						<IonHeader translucent>
							<IonToolbar>
								<IonTitle>Créer un nouveau groupe</IonTitle>
								<IonButtons slot="end">
									<IonButton onClick={() => setShowModal(false)}>Close</IonButton>
								</IonButtons>
							</IonToolbar>
						</IonHeader>
						<IonContent fullscreen>
							<IonGrid>
								<IonRow>
									<IonCol>
										<IonAvatar>
											<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
										</IonAvatar>
										<IonList>
											<IonListHeader>
												Nom du groupe
											</IonListHeader>
											<IonItem>
												<IonInput placeholder="Nom du groupe"></IonInput>
											</IonItem>
										</IonList>
									</IonCol>
								</IonRow>
							</IonGrid>
						
						</IonContent>
					</IonModal>
          	  	<IonGrid>
					<IonRow>
						<IonCol>
							<IonButton onClick={() => setShowModal(true)} expand="block" color="success">Créer un nouveau groupe</IonButton>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonList>
								<IonListHeader>
									Mes Groupes
								</IonListHeader>
								<IonItem>
									<IonAvatar slot="start">
									<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
									</IonAvatar>
									<IonLabel>
										<h2>Florian</h2>
										<p>30 membres</p>
										<p>Créée le: 10/07/2020</p>
									</IonLabel>
									<IonButton color="warning">Modifier</IonButton>
								</IonItem>
							</IonList>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonList>
								<IonListHeader>
									Groupe auxquels j'appartient
								</IonListHeader>
								<IonItem>
									<IonAvatar slot="start">
									<img alt='Profile' src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
									</IonAvatar>
									<IonLabel>
										<h2>Groupe1</h2>
										<p>13 membres</p>
										<p>Membres depuis: 10/07/2018</p>
									</IonLabel>
									<IonButton color="danger">Quitter</IonButton>
								</IonItem>
							</IonList>
						</IonCol>
					</IonRow>
				</IonGrid>
		</IonContent>
	</IonPage>
    );
};
  
export default Group;
  
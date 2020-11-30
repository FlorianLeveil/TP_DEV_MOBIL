import {
	IonAvatar,
	IonButton,
	IonButtons,
    IonCol,
    IonContent,
	IonFab,
	IonFabButton,
    IonGrid,
    IonHeader,
	IonIcon,
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
import { add } from 'ionicons/icons';
import React, { useState } from 'react';
import GroupAddGroupModal from '../components/groupComponents/GroupAddGroupModal';
  

  
const Group: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
    return (
      <IonPage>
          	<IonContent>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton onClick={() => setShowModal(true)}>
							<IonIcon icon={add} />
						</IonFabButton>
				</IonFab>
				<GroupAddGroupModal showModal={showModal} setShowModal={setShowModal}/>
          	  	<IonGrid>
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
  
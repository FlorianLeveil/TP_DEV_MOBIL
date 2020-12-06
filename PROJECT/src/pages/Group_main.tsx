import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import GroupAddGroupModal from '../components/groupComponents/GroupModal';
import MyGroupList from '../components/groupComponents/MyGroupList';
import OtGroupList from '../components/groupComponents/OtGroupList';
import AppContext from '../data/app-context';
  
const GroupsListing: React.FC = () => {
	const appCtx = useContext(AppContext);
	const [showModal, setShowModal] = useState<boolean>(false);

    return (
		<IonPage>
				<IonContent>
					<IonFab vertical={appCtx.groups.length > 0 ? "bottom" : "center"} horizontal={appCtx.groups.length > 0 ? "end" : "center"} slot="fixed">
						<IonFabButton onClick={() => setShowModal(true)}>
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>
					<GroupAddGroupModal showModal={showModal} setShowModal={setShowModal}/>
					<IonGrid>
						<IonRow>
							<IonCol>
								<MyGroupList />
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<OtGroupList />
							</IonCol>
						</IonRow>
					</IonGrid>
			</IonContent>
		</IonPage>
    );
};
  
export default GroupsListing;
  
import { IonItem, IonItemSliding, IonLabel, IonList, IonListHeader, IonTitle } from '@ionic/react'
import firebase from '../../firebase';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { Group } from '../../data/app-context';
import { ROUTE_GROUP } from '../../nav/Routes';
import { fromDate } from '../../helpers/dateHelper';
import { useHistory } from 'react-router';

const MyGroupList: React.FC = () => {
    const appCtx = useContext(AppContext);
    const history = useHistory();
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    
    useEffect(() => {
		firebase.firestore().collection("Groups").where("users", "array-contains", appCtx.userdata.uid)
			.onSnapshot( async (snapshot) => {
				let myList: Group[] = [];

				snapshot.docs.forEach((someGroup) => {
					if (someGroup.data().creatorId === appCtx.userdata.uid) {
						myList.push(someGroup.data() as Group);
					}
				});

				setMyGroups(myList);
			})
	//eslint-disable-next-line
    }, []);

    const handleClick = (grpId: string) => {
        history.push(ROUTE_GROUP + grpId);
    }
    
    const fillMyList = () => {
		if (myGroups.length === 0) {
			return (
				<IonItem>
					<IonLabel>
						No groups created for now
					</IonLabel>
				</IonItem>
			)
		} else {
			return myGroups.map((grp, index) => {
                return (
                    <IonItemSliding key={index} onClick={() => handleClick(grp.groupId)}>
                        <IonItem routerLink={ROUTE_GROUP}>
                            <IonLabel>
                                <h2>{grp.groupName}</h2>
                                <p>{grp.lastMessage.message}</p>
                            </IonLabel>
                            <IonLabel>
                                {grp.users.length} participants
                            </IonLabel>
                            <IonLabel>
                                <em>
                                    {fromDate(grp.lastMessage.sendedAt.seconds)}
                                </em>
                            </IonLabel>
                        </IonItem>
                    </IonItemSliding>
                )
            })
		}
	}

    return (
        <IonList>
            <IonListHeader>
                <IonTitle>Mes groupes : </IonTitle>
            </IonListHeader>
            {
                fillMyList()
            }
        </IonList>
    )
}

export default MyGroupList
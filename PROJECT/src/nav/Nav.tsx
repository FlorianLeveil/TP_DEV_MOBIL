import React, { useState } from 'react';
import { Redirect, Route} from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';

import { personAdd, settings, people, home } from 'ionicons/icons';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Group from '../pages/Group_main';
import Home from '../pages/Home';
import { ROUTE_CONTACT, ROUTE_PROFILE, ROUTE_GROUP_MAIN, ROUTE_HOME, ROUTE_NAV, ROUTE_CONNEXION } from './Routes';
import Connexion from '../pages/Connexion';
import { UserData } from '../data/app-context';
import firebase from 'firebase';

const Nav: React.FC = () => {
    const [, setUserData] = useState<UserData>()

	let current_user = firebase.auth().currentUser
	let id_current_user = current_user?.uid
	const db = firebase.firestore();
	let user_props = db.collection('Users').doc(id_current_user)

	user_props.get().then(function(user_props) {
		if (user_props.exists) {
			const user_data_from_db = user_props.data()
			const newUserData: UserData = {
				phone: user_data_from_db?.phone,
				username: user_data_from_db?.username,
				name: user_data_from_db?.name,
				lastname: user_data_from_db?.lastname,
				email: user_data_from_db?.email,
				birthdate: user_data_from_db?.birthdate,
				description: user_data_from_db?.description,
			}
			setUserData(newUserData)
		} else {
			console.log("No such document!");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
    });
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path={ROUTE_CONTACT} component={Contact} exact />
                <Route path={ROUTE_PROFILE + id_current_user} component={Profile} exact />
                <Route path={ROUTE_CONNEXION} component={Connexion} exact />
                <Route path={ROUTE_GROUP_MAIN} component={Group} exact />
                <Route path={ROUTE_HOME} component={Home} exact />
                <Redirect path={ROUTE_NAV} exact to={ROUTE_HOME} />

            </IonRouterOutlet>
            <IonTabBar slot="top">
                <IonTabButton tab="Home" href={ROUTE_HOME}>
                    <IonIcon icon={home} />
                    <IonLabel>Messages</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Contact" href={ROUTE_CONTACT}>
                    <IonIcon icon={personAdd} />
                    <IonLabel>Contact</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Group" href={ROUTE_GROUP_MAIN}>
                    <IonIcon icon={people} />
                    <IonLabel>Group</IonLabel>
                </IonTabButton>
                <IonTabButton tab="Profile" href={ROUTE_PROFILE + id_current_user}>
                    <IonIcon icon={settings} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
};

export default Nav;
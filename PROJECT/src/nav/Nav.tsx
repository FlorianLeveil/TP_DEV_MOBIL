import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';

import { personAdd, settings, people, home } from 'ionicons/icons';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Group from '../pages/Group_main';
import Home from '../pages/Home';
import { ROUTE_CONTACT, ROUTE_PROFILE, ROUTE_GROUP_MAIN, ROUTE_HOME, ROUTE_NAV, ROUTE_CONNEXION } from './Routes';
import Connexion from '../pages/Connexion';
import firebase from 'firebase';

const Nav: React.FC = () => {

	const id_current_user = firebase.auth().currentUser?.uid

	// const user_props = db.collection('Users').doc(id_current_user)

    // useEffect(() => {
    //     if ( id_current_user !== "" ) {
    //         console.log(id_current_user);
    //         // firebase.firestore().collection('Users').doc(id_current_user).get().then((user_props) => {
    //         //     if (user_props.exists) {
    //         //         const user_data_from_db = user_props.data()
    //         //         const newUserData: UserData = {
    //         //             phone: user_data_from_db?.phone,
    //         //             username: user_data_from_db?.username,
    //         //             name: user_data_from_db?.name,
    //         //             lastname: user_data_from_db?.lastname,
    //         //             email: user_data_from_db?.email,
    //         //             birthdate: user_data_from_db?.birthdate,
    //         //             description: user_data_from_db?.description,
    //         //         }
    //         //         appCtx.updateUserData(newUserData);
    //         //         // setUserData(newUserData);
    //         //     } else {
    //         //         console.log("No such document!");
    //         //     }
    //         // }).catch( (error) => {
    //         //     console.error("Error getting document:", error);
    //         // });
    //     } else {
    //         console.log('Empty : ', id_current_user);
    //     }
    // }, [appCtx, id_current_user])
    
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
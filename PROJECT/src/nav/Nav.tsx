import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import {
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';

import {personAdd, settings, people, home} from 'ionicons/icons';
import Contact from '../pages/Contact';
import Profile from '../pages/Profile';
import Group from '../pages/Group_main';
import Home from '../pages/Home';
import { ROUTE_CONTACT, ROUTE_PROFILE, ROUTE_GROUP_MAIN, ROUTE_HOME, ROUTE_NAV } from './Routes';

const Nav: React.FC = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route path={ROUTE_CONTACT} component={Contact} exact />
            <Route path={ROUTE_PROFILE} component={Profile} exact />
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
            <IonTabButton tab="Profile" href={ROUTE_PROFILE}>
                <IonIcon icon={settings} />
                <IonLabel>Profile</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default Nav;
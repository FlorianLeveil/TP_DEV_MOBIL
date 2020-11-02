import React from 'react';
import { Redirect, Route} from 'react-router-dom';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';

import { pulseOutline, personCircleOutline } from 'ionicons/icons';

import Live from '../pages/Live';
import Profile from '../pages/Profile';

import { ROUTE_LIVE, ROUTE_PROFILE, ROUTE_TABS_BASE } from './Routes';

const Tabs: React.FC = () => (
    <IonTabs>
        <IonRouterOutlet>
            <Route path={ROUTE_LIVE} component={Live} exact />
            <Route path={ROUTE_PROFILE} component={Profile} exact />
            <Redirect path={ROUTE_TABS_BASE} exact to={ROUTE_LIVE} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
            <IonTabButton tab="List" href={ROUTE_LIVE}>
                <IonIcon icon={pulseOutline} />
                <IonLabel>List</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Profile" href={ROUTE_PROFILE}>
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
            </IonTabButton>
        </IonTabBar>
    </IonTabs>
);

export default Tabs;

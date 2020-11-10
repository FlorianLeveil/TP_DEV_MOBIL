import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AuthRoutes from './nav/AuthRoutes';
import PrivateRoute from './nav/PrivateRoutes';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import {ROUTE_CONTACT, ROUTE_HOME, ROUTE_GROUP_MAIN, ROUTE_PROFILE, ROUTE_CONNEXION } from './nav/Routes';
import Nav from './nav/Nav';
import AppContext from './data/app-context';
import Connexion from './pages/Connexion';

const App: React.FC = () => {

  const appCtx = useContext(AppContext);

  useEffect(() => {
    appCtx.initContext();
  }, [])

  return (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route path={ROUTE_HOME} component={Nav} />

        <Redirect path="/" exact to={ROUTE_CONNEXION} /> */}
          <Switch>
            <PrivateRoute path={ROUTE_CONTACT} component={Nav} />
            <PrivateRoute path={ROUTE_GROUP_MAIN} component={Nav} />
            <PrivateRoute path={ROUTE_CONNEXION} component={Connexion}/>
            <PrivateRoute exact path={`${ROUTE_PROFILE}:id`} component={Nav} />
            <PrivateRoute path={ROUTE_HOME} component={Nav} />
            <Route path="/auth" component={AuthRoutes} />
            <Redirect path="/" to={ROUTE_HOME} />
          </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;

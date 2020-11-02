import { GeolocationPosition, Plugins } from '@capacitor/core';
import { IonRow, IonCol, IonLabel } from '@ionic/react';
import React, { useState } from 'react';

const { Geolocation } = Plugins;

const GeolocationComponent: React.FC = () => {
    const [location, setLocation] = useState<GeolocationPosition>();

    const watchId = Geolocation.watchPosition({ timeout: 1000 }, (position) => {
        setLocation(position);
    });

    return (
        <>
            <IonRow>
                <IonCol>
                    <IonLabel>Latitude :</IonLabel>
                    <IonLabel>{ location?.coords.latitude }</IonLabel>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonLabel>Longitude :</IonLabel>
                    <IonLabel>{ location?.coords.longitude }</IonLabel>
                </IonCol>
            </IonRow>
        </>
    )
}

export default GeolocationComponent
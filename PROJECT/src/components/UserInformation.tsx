import { IonAlert, IonItem, IonLabel, IonNote } from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext, { UserData, UserInformationFields } from '../data/app-context';
import firebase from "../firebase";
import "firebase/firestore";


const UserInformationItem: React.FC<{userdata: any, field: UserInformationFields, friendlyName: string, unit: String, type: String }> = (props) => {
    const appCtx = useContext(AppContext)
    const [showAlert, setShowAlert] = useState(false);


    return (
        <IonItem>
            <IonLabel>
                {props.friendlyName}
            </IonLabel>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={props.friendlyName}
                inputs={[
                    {
                        name: props.userdata,
                        type: 'textarea',
                        id: `user-${props.field}`,
                        value: props.userdata,
                        placeholder: 'Your ' + props.userdata
                    }
                ]}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: 'Ok',
                        // handler: (alertData) => update(alertData[props.field])
                    }
                ]} />
        </IonItem>
    )
}

export default UserInformationItem
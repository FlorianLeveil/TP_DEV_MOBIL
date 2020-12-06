import { IonAlert, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import React, { useContext, useState } from 'react';
import AppContext, { Group } from '../../data/app-context';
import firebase from "../../firebase";

interface oui {
    [key: string]: firebase.firestore.DocumentData;
}

const GroupInformationItem: React.FC<{action: string, text: string, users: oui, group: Group}> = (props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const appCtx = useContext(AppContext);
    const [usrList, setUsrList] = useState<string[]>([]);

    const whatToDisplay = () => {
        switch (props.action) {
            case "addUser":
                return (
                    <IonModal
                        isOpen={showModal}
                    />
                )
            case "remUser":
                return (
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={`oui`}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: () => {
                                    console.log('Confirm Cancel');
                                }
                            },
                            {
                                text: 'Ok',
                                cssClass: 'primary',
                                handler: (data: any) => {
                                    console.log("Clicked !");
                                    setShowAlert(false);
                                }
                            }
                        ]}
                    />
                )
            case "eleUser":
                return (
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={`oui`}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: () => {
                                    console.log('Confirm Cancel');
                                }
                            },
                            {
                                text: 'Ok',
                                cssClass: 'primary',
                                handler: (data: any) => {
                                    console.log("Clicked !");
                                    setShowAlert(false);
                                }
                            }
                        ]}
                    />
                )
            case "retUser":
                return (
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={`oui`}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: () => {
                                    console.log('Confirm Cancel');
                                }
                            },
                            {
                                text: 'Ok',
                                cssClass: 'primary',
                                handler: (data: any) => {
                                    console.log("Clicked !");
                                    setShowAlert(false);
                                }
                            }
                        ]}
                    />
                )
            case "delConv":
                return (
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        message={`oui`}
                        buttons={[
                            {
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary',
                                handler: () => {
                                    console.log('Confirm Cancel');
                                }
                            },
                            {
                                text: 'Ok',
                                cssClass: 'primary',
                                handler: (data: any) => {
                                    console.log("Clicked !");
                                    setShowAlert(false);
                                }
                            }
                        ]}
                    />
                )
        }
    }

    return (
        <IonItem onClick={() => {setShowAlert(true)}}>
            <IonLabel>
                {props.text}
            </IonLabel>
            {
                whatToDisplay()
            }
        </IonItem>
    )
}

export default GroupInformationItem
import { IonAvatar, IonButton, IonCheckbox, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonLoading, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../data/app-context';
import defaultProfile from '../../assets/defaultProfile.jpg';
import firebase from '../../firebase';
import { sendSharp } from 'ionicons/icons';


const GroupModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const appCtx = useContext(AppContext);
    const [showLoading, setShowLoading] = useState<boolean>(true);
    const [searchData, setSearchData] = useState<firebase.firestore.DocumentData[]>([]);
    const [contacts, setContacts] = useState<string[]>([]);
    const [messageValue, setMessageValue] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");

    useEffect(() => {
        if (!appCtx.userdata.contact) {
            setSearchData([]);
            return;
        }
        firebase.firestore().collection("Contacts").doc(appCtx.userdata.contact)
            .onSnapshot((res) => {
                let contactList: [] = res.data()?.contactList;
                let resList: firebase.firestore.DocumentData[] = [];
                contactList.forEach( async (contact) => {
                    await firebase.firestore().collection('Users').doc(contact).get()
                        .then((res2) => {
                            resList.push(res2);
                        })
                })

                setSearchData(resList);
            })
    //eslint-disable-next-line
    }, [])

    const handleCheckBoxes = (id: string) => {
        contacts.includes(id) ?
            setContacts(contacts.filter((val) => { return val !== id })) :
            setContacts((prevState) => {
                prevState.push(id);
                return prevState;
            });
    }

    const handleCreateGroup = () => {
        try {
            appCtx.createGroup(appCtx.user!.uid, contacts, groupName, messageValue);
            setTimeout(() => {
                setContacts([]);
                setMessageValue('');
                setGroupName('');
                props.setShowModal(false);
            }, 2000)
        } catch (error) {
            console.log("Error in start conversation : ", error);
        }
    }

    const fillResults = () => {
        if ( searchData.length === 0 ) {
            return (
                <IonItem>
                    <IonLabel>
                        Aucun résultats :'(
                    </IonLabel>
                </IonItem>
            )
        } else {
            return searchData.map((value) => (
                <IonItem key={value.data().uid}>
                    <IonAvatar slot="start">
                        <img alt='Profile' src={value.data()?.picture ? value.data()?.picture : defaultProfile} />
                    </IonAvatar>
                    <IonLabel>
                        <h2>
                            {
                                appCtx.user!.uid === value.data().uid ? value.data()?.username + ' (Moi)' : value.data()?.username
                            }
                        </h2>
                        <p>{value.data()?.email}</p>
                    </IonLabel>
                    
                    <IonCheckbox checked={contacts.includes(value.data().uid)} value={value.data().uid} onIonChange={(e) => handleCheckBoxes(e.detail.value)} />
                </IonItem>
            ))
        }
    }

    return (
        <>
            <IonModal isOpen={props.showModal} backdropDismiss={false}>
                <IonHeader translucent>
                    <IonToolbar>
                            <IonTitle>Recherche Contact</IonTitle>
                            <IonButton slot="end" type="reset" fill="clear" onClick={() => {
                                props.setShowModal(false)
                            }}>Retour</IonButton>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        {
                            fillResults()
                        }
                    </IonList>
                </IonContent>

                <IonFooter>
                    <form>
                        <IonItem>
                            <IonLabel>Nom du groupe : </IonLabel>
                            <IonInput placeholder="Nom du groupe" value={groupName} onIonChange={(e) => setGroupName(e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonLabel>Message : </IonLabel>
                            <IonInput value={messageValue} onIonChange={(e) => setMessageValue(e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonButton onClick={() => handleCreateGroup()}>
                                <IonIcon slot="icon-only" icon={sendSharp} />
                            </IonButton>
                        </IonItem>
                    </form>
                </IonFooter>
            </IonModal>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}
                duration={2000}
            />
        </>
    );
};

export default GroupModal
import { FilesystemDirectory, Plugins } from '@capacitor/core';
import {
    IonButton,
    IonCol,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonModal,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import AppContext, { Picture } from '../data/app-context';
import AddPictureNewUser from './AddPictureNewUser';
import defaultImg from '../assets/default.png'


const { Filesystem } = Plugins;

const AddUserModal: React.FC<{ showModal: boolean, setShowModal: (value: boolean) => void }> = (props) => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const usernameRef = useRef<HTMLIonInputElement>(null);
    const nameRef = useRef<HTMLIonInputElement>(null);
    const lastnameRef = useRef<HTMLIonInputElement>(null);
    const appCtx = useContext(AppContext);
    const [picture, setPicture] = useState<Picture>();
    const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');

    const resetModal = () => {
        setPicture(undefined)
    }

    const addHandler = async () => {
        // Save picture on filesystem
        if (picture) {
            console.log(picture)
            await Filesystem.writeFile({
                path: picture.filename,
                data: picture.base64,
                directory: FilesystemDirectory.Data
            })
        }

        let defaultPicture: Picture = {
            id: '',
            filename: '',
            webPath: '',
            base64: ''
        }
        
        // let newUser: User = {
        //     id: new Date().toISOString(),
        //     email: emailRef.current?.value ? emailRef.current?.value?.toString() : "Unknown email",
        //     password: passwordRef.current?.value ? passwordRef.current?.value?.toString() : "Unknown password",
        //     username: usernameRef.current?.value ? usernameRef.current?.value?.toString() : "Unknown username",
        //     name: nameRef.current?.value ? nameRef.current?.value?.toString() : "Unknown name",
        //     lastname: lastnameRef.current?.value ? lastnameRef.current?.value?.toString() : "Unknown lastname",
        //     birthdate: selectedDate,
        //     description: '',
        //     picture: defaultPicture,
        //     friends: [],
        //     conversations: [],
        // }
        // appCtx.addUser(newUser)
        props.setShowModal(false)
    }

    const updatePicture = (newPicture: Picture) => {
        setPicture(newPicture)
    }

    return (
        <IonModal isOpen={props.showModal} onDidPresent={resetModal}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Add new apartment</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol></IonCol>
                    </IonRow>
                </IonGrid>
                <IonList className="ion-padding-bottom" mode="ios">
                    <IonListHeader>
                        Inscription
                    </IonListHeader>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput ref={emailRef} value="Your Email"></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput type="password" ref={passwordRef}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Username</IonLabel>
                        <IonInput ref={usernameRef}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput ref={nameRef}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Lastname</IonLabel>
                        <IonInput type="number" ref={lastnameRef} value={500}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Birthdate</IonLabel>
                        <IonDatetime displayFormat="MM/DD/YYYY" min="1994-03-14" max="2012-12-09" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>                    
                    </IonItem>
                    <AddPictureNewUser updatePicture={updatePicture} />
                </IonList>
                <IonGrid>
                    <IonRow className="ion-justify-content-between">
                        <IonCol size="auto" >
                            <IonButton fill="outline" onClick={() => props.setShowModal(false)}>Cancel</IonButton>
                        </IonCol>
                        <IonCol size="auto" >
                            <IonButton onClick={addHandler}>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
};

export default AddUserModal;

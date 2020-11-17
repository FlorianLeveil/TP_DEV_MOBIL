import React, { useState, useEffect, useRef } from 'react';
import AppContext, { Contact, defaultContact, defaultUserData, UserData } from './app-context';
import { Plugins } from '@capacitor/core'
import firebase from "../firebase"

const { Storage } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [userdata, setUserData] = useState<UserData>(defaultUserData as UserData)
    const [contacts, setContacts] = useState<Contact>(defaultContact as Contact)

    // Auth state
    const [user, setUser] = useState(null as firebase.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);

    const didMountRef = useRef(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
            setUser(user);
            setLoadingAuthState(false);
            let firebaseUser = user as firebase.User;
            const db = firebase.firestore();
            if (firebaseUser && firebaseUser.uid) {
                db.collection("Users").doc(firebaseUser.uid)
                    .onSnapshot(function (doc) {
                        const updatedProfile = doc.data() as UserData;
                        setUserData(updatedProfile)
                        db.collection("Contacts").doc(updatedProfile.contact)
                            .onSnapshot(function (doc) {
                                const updatedContact = doc.data() as Contact;
                                setContacts(updatedContact)
                            });
                    });

                
            }
        });
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            Storage.set({ key: 'userdata', value: JSON.stringify(userdata) });
            Storage.set({ key: 'contactList', value: JSON.stringify(contacts) });
        } else {
            didMountRef.current = true;
        }
    }, [userdata, contacts])

    const setupUserData = (userId: string) => {
        console.log("setupUserData is saying HELLO!:",userId)
        firebase.firestore().collection('Users').doc(userId).get()
            .then(doc => {
                const data = doc.data();
                const aled: UserData = {
                    phone: data?.phone,
                    username: data?.username,
                    name: data?.name,
                    lastname: data?.lastname,
                    contact: data?.contact,
                    email: data?.email,
                    birthdate: data?.birthdate,
                    description: data?.description,
                    uid: data?.uid,
                }
                setUserData(aled);
            }).catch((err) => {
                console.log("An error occured : ", err)
            })
    }

    const updateUserData = (user: any) => {
        firebase.firestore().collection('Users').doc(user!.uid).get()
            .then(doc => {
                const data = doc.data();
                const aled: UserData = {
                    phone: data?.phone,
                    username: data?.username,
                    name: data?.name,
                    contact: data?.contact,
                    lastname: data?.lastname,
                    email: data?.email,
                    birthdate: data?.birthdate,
                    description: data?.description,
                    uid: data?.uid,
                }
                setUserData(aled);
            }).catch((err) => {
                console.log("An error occured : ", err)
            })
    }

    const updateOneFieldUserData = (user: any, fieldName: string, value: any) => {
        firebase.firestore().collection('Users').doc(user!.uid).update({
            [fieldName]: value
        }).then(() => {
            updateUserData(user);
        }).catch((err) => {
            console.error("Got errored with : ", err);
        });
    }

    const setupContactList = (userId: string) => {
        firebase.firestore().collection('Users').doc(userId).get()
            .then( (userPropsResult) => {
                firebase.firestore().collection('Contacts').doc(userPropsResult.data()?.contact)
                    .onSnapshot(function(doc) {
                        setContacts(doc.data() as Contact)
                    })
            }).catch( (err) => {
                console.log("An error occured : ", err);
            });        
    }

    const addContact = (newContact: string) => {
        console.log("Add contact : ", newContact);
        // setContacts((prevState) => {
        //     let newList = [...prevState];
        //     newList.unshift(newContact);
        //     return newList
        // })
    }

    const removeContact = (removeContact: string) => {
        console.log("Remove contact : ", removeContact);
    }

    const initContext = async () => {
        const userData = await Storage.get({ key: 'userdata' });
        const contactList = await Storage.get({ key: 'contactList' });

        const storedUserData = userData.value ? JSON.parse(userData.value) : defaultUserData;
        const storedContactList = contactList.value ? JSON.parse(contactList.value) : defaultContact;
        
        didMountRef.current = false;

        setUserData(storedUserData);
        setContacts(storedContactList);
    }

    return (
        <AppContext.Provider value={{
            initContext,

            userdata,
            setupUserData,
            updateUserData,
            updateOneFieldUserData,

            contacts,
            setupContactList,
            addContact,
            removeContact,
            
            user,
            authenticated: user !== null,
            setUser,
            loadingAuthState
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
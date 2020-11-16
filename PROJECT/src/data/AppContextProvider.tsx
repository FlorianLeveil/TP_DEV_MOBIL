import React, { useState, useEffect, useRef } from 'react';
import AppContext, { defaultUserData, UserData, defaultContact } from './app-context';
import { Plugins } from '@capacitor/core'
import firebase from "../firebase";


const { Storage } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [userdata, setUserData] = useState<UserData>(defaultUserData as UserData)
    const [contacts, setContacts] = useState<firebase.firestore.DocumentData>(defaultContact)

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
                    });
            }
        });
    }, []);

    useEffect(() => {
        if (didMountRef.current) {
            Storage.set({ key: 'userdata', value: JSON.stringify(userdata) })
        } else {
            didMountRef.current = true;
        }
    }, [userdata, contacts])

    const setupUserData = (userProps: any) => {
        console.log("setupUserData is saying HELLO!:",userProps)
        firebase.firestore().collection('Users').doc(userProps.user!.uid).get()
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

    const setupContactList = (userProps: any) => {
        console.log("SetupContactList is saying HELLO!:",userProps)
        firebase.firestore().collection('Users').doc(userProps.user!.uid).get()
            .then( (userPropsResult) => {
                firebase.firestore().collection('Contacts').doc(userPropsResult.data()?.contact).get().then(
                    (res) => setContacts(res)
                )                
            }).catch( (err) => {
                console.log("An error occured : ", err);
            });        
    }

    const addContact = (newContact: String) => {
        console.log("Add contact : ", newContact);
        // setContacts((prevState) => {
        //     let newList = [...prevState];
        //     newList.unshift(newContact);
        //     return newList
        // })
    }

    const removeContact = (removeContact: String) => {
        console.log("Remove contact : ", removeContact);
    }

    const initContext = async () => {
        const userData = await Storage.get({ key: 'userdata' })
        const storedUserData = userData.value === undefined ? JSON.parse(userData.value) : defaultUserData;
        
        didMountRef.current = false;

        setUserData(storedUserData)
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
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
                        if ( updatedProfile.contact !== '' ) {
                            db.collection("Contacts").doc(updatedProfile.contact)
                            .onSnapshot(function (doc) {
                                const updatedContact = doc.data() as Contact;
                                setContacts(updatedContact)
                            });
                        }
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

    const setupUserData = (user: any) => {
        firebase.firestore().collection('Users').doc(user.user.uid).get()
            .then(doc => {
                const data = doc.data();
                const aled: UserData = {
                    phone: data?.phone,
                    username: data?.username,
                    name: data?.name,
                    lastname: data?.lastname,
                    picture: data?.picture,
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
        const db = firebase.firestore();
        const docRef = db.collection('Users').doc(user?.uid);
        db.runTransaction((transaction) => {
            return transaction.get(docRef).then( (doc) => {
                if (!doc.exists) {
                    console.log("Fail to update profile")
                } else {
                    transaction.update(docRef, user)
                }
            })
        })
    }

    const updateOneFieldUserData = (user: any, fieldName: string, value: any) => {
        firebase.firestore().collection('Users').doc(user!.uid).update({
            [fieldName]: value
        });
    }

    const setupContactList = (user: any) => {
        firebase.firestore().collection('Users').doc(user.user.uid).get()
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
        if ( contacts.myPendingList.includes(newContact) || contacts.otPendingList.includes(newContact) ) {
            // Add to my waiting contact list
            const filtered = contacts.otPendingList.filter((value, index, arr) => { return value !== newContact; });
            contacts.contactList.push(newContact);
            firebase.firestore().collection('Contacts').doc(userdata.contact).update({
                contactList: contacts.contactList,
                otPendingList: filtered
            });

            // Add to other contact list
            firebase.firestore().collection('Contacts').where('uidUser', '==', newContact).get()
                .then((res) => {
                    let ctt = res.docs[0].data() as Contact;
                    const cttFiltered = ctt.myPendingList.filter((value, index, arr) => { return value !== userdata.uid; });
                    ctt.contactList.push(userdata.uid);
                    firebase.firestore().collection('Users').where('uid', '==', newContact).get()
                        .then((res) => {
                            firebase.firestore().collection('Contacts').doc(res.docs[0].data().contact).update({
                                contactList: ctt.contactList,
                                myPendingList: cttFiltered
                            })
                        })
                })
        } else {
            // Add to my waiting contact list
            contacts.myPendingList.push(newContact)
            firebase.firestore().collection('Contacts').doc(userdata.contact).update({
                myPendingList: contacts.myPendingList
            });

            // Add to other contact list
            firebase.firestore().collection('Contacts').where('uidUser', '==', newContact).get()
                .then((res) => {
                    let ctt = res.docs[0].data() as Contact;
                    ctt.otPendingList.push(userdata.uid);
                    firebase.firestore().collection('Users').where('uid', '==', newContact).get()
                        .then((res) => {
                            firebase.firestore().collection('Contacts').doc(res.docs[0].data().contact).update({
                                otPendingList: ctt.otPendingList
                            })
                        })
                })
        }
    }

    const removeContact = (removeContact: string) => {
        const filtered = contacts.contactList.filter((value, index, arr) => { return value !== removeContact; });
        firebase.firestore().collection('Contacts').doc(userdata.contact).update({
            contactList: filtered
        });

        firebase.firestore().collection('Contacts').where('uidUser', '==', removeContact).get()
                .then((res) => {
                    let ctt = res.docs[0].data() as Contact;
                    const filtered = ctt.contactList.filter((value, index, arr) => { return value !== userdata.uid; });
                    firebase.firestore().collection('Users').where('uid', '==', removeContact).get()
                        .then((res) => {
                            firebase.firestore().collection('Contacts').doc(res.docs[0].data().contact).update({
                                contactList: filtered
                            })
                        })
                })
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
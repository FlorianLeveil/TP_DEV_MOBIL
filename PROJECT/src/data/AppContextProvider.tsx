import React, { useState, useEffect, useRef } from 'react';
import AppContext, { Message, ConversationGroup, ConversationNormal, Picture, defaultUserData, UserData } from './app-context';
import { Plugins } from '@capacitor/core'
import firebase from "../firebase";

const { Storage } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [userdata, setUserData] = useState<UserData>(defaultUserData)
    const [contacts, setContacts] = useState<firebase.firestore.DocumentData[]>([])
    const [picture, setPicture] = useState<Picture[]>([])
    const [message, setMessage] = useState<Message[]>([])
    const [conversationGroup, setConversationGroup] = useState<ConversationGroup[]>([])
    const [conversationNormal, setConversationNormal] = useState<ConversationNormal[]>([])

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
            // Storage.set({ key: 'contacts', value: JSON.stringify(contacts) })
            // Storage.set({ key: 'picture', value: JSON.stringify(picture) })
            // Storage.set({ key: 'message', value: JSON.stringify(message) })
            // Storage.set({ key: 'conversationGroup', value: JSON.stringify(conversationGroup) })
            // Storage.set({ key: 'conversationNormal', value: JSON.stringify(conversationNormal) })
        } else {
            didMountRef.current = true;
        }
    }, [userdata, contacts, picture, message, conversationGroup, conversationNormal])

    // const addUserData = (newUser: UserData) => {
    //     setUserData((prevState) => {
    //     let newList = [...prevState];
    //     newList.unshift(newUser);
    //     return newList
    //     })
    // }

    const setupUserData = (userProps: any) => {
        firebase.firestore().collection('Users').doc(userProps.user!.uid).get()
            .then(doc => {
                const data = doc.data();
                const aled: UserData = {
                    phone: data?.phone,
                    username: data?.username,
                    name: data?.name,
                    lastname: data?.lastname,
                    email: data?.email,
                    birthdate: data?.birthdate,
                    description: data?.description,
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
                    lastname: data?.lastname,
                    email: data?.email,
                    birthdate: data?.birthdate,
                    description: data?.description,
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
        console.log("Context user called : ", userProps);
        console.log("BEFORE - Context contacts list : ", contacts);
        firebase.firestore().collection('Users').doc(userProps.user!.uid).get()
            .then( (userPropsResult) => {
                console.log("User data : ", userPropsResult);
                var contactDump = userPropsResult.get('contact');
                console.log('Contacts : ', contactDump);
                contactDump.get().then( (contactsRes: firebase.firestore.DocumentData) => {
                    console.log('Contact file : ', contactsRes.data())
                    var maybeContact: firebase.firestore.DocumentData[] = Object.values(contactsRes.data());
                    console.log()
                    maybeContact.forEach( (contact) => {
                        for (var i = 0; i <= maybeContact.length; i++) {
                            setContacts((prevState) => {
                                let newList = [...prevState];
                                newList.push(contact);
                                return newList
                            })
                        }
                    })
                });
            }).catch( (err) => {
                console.log("An error occured : ", err);
            });

        console.log("AFTER - Context contacts list : ", contacts);
    }

    const addContact = (newContact: firebase.firestore.DocumentData) => {
        setContacts((prevState) => {
            let newList = [...prevState];
            newList.unshift(newContact);
            return newList
        })
    }

    const removeContact = (removeContact: firebase.firestore.DocumentData) => {

    }

    const addPicture = (newPicture: Picture) => {
        setPicture((prevState) => {
            let newList = [...prevState];
            newList.unshift(newPicture);
            return newList
        })
    }

    const updatePicture = (updatePicture: Picture) => {
        const index = picture.map(el => el.id).indexOf(updatePicture.id)
        setPicture((prevState) => {
            let newList = [...prevState];
            newList.splice(index, 1, updatePicture)
            return newList
        })
    }

    const addMessage = (newMessage: Message) => {
        setMessage((prevState) => {
        let newList = [...prevState];
        newList.unshift(newMessage);
        return newList
        })
    }

    const addConversationNormal = (newConversationNormal: ConversationNormal) => {
        setConversationNormal((prevState) => {
        let newList = [...prevState];
        newList.unshift(newConversationNormal);
        return newList
        })
    }

    const addConversationGroup= (newConversationGroup: ConversationGroup) => {
        setConversationGroup((prevState) => {
        let newList = [...prevState];
        newList.unshift(newConversationGroup);
        return newList
        })
    }

    const initContext = async () => {
        const userData = await Storage.get({ key: 'userdata' })
        // const contactsData = await Storage.get({ key: 'contacts' })
        // const pictureData = await Storage.get({ key: 'picture' })
        // const messageData = await Storage.get({ key: 'message' })
        // const conversationNormalData = await Storage.get({ key: 'conversationNormal' })
        // const conversationGroupData = await Storage.get({ key: 'conversationGroup' })

        const storedUserData = userData.value ? JSON.parse(userData.value) : [];
        // const storedContacts = contactsData.value ? JSON.parse(contactsData.value) : [];

        // const storedPicture = pictureData.value ? JSON.parse(pictureData.value) : [];
        // const storedMessage = messageData.value ? JSON.parse(messageData.value) : [];
        // const storedConversationNormal= conversationNormalData.value ? JSON.parse(conversationNormalData.value) : [];
        // const storedConversationGroup = conversationGroupData.value ? JSON.parse(conversationGroupData.value) : [];
        
        didMountRef.current = false;

        setUserData(storedUserData)
        // setContacts(storedContacts)
        // setPicture(storedPicture)
        // setMessage(storedMessage)
        // setConversationNormal(storedConversationNormal)
        // setConversationGroup(storedConversationGroup)
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
            message, 
            conversationGroup, 
            conversationNormal, 
            picture,
            addPicture, 
            updatePicture, 
            addMessage, 
            addConversationGroup, 
            addConversationNormal,  
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
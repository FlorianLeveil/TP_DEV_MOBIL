import React, { useState, useEffect, useRef } from 'react';
import AppContext, {Message, ConversationGroup, ConversationNormal, Picture, UserData } from './app-context';
import { Plugins } from '@capacitor/core'
import firebase from "../firebase";

const { Storage, Filesystem } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [userdata, setUserData] = useState<UserData[]>([])
    const [picture, setPicture] = useState<Picture[]>([])
    const [message, setMessage] = useState<Message[]>([])
    const [conversationGroup, setConversationGroup] = useState<ConversationGroup[]>([])
    const [conversationNormal, setConversationNormal] = useState<ConversationNormal[]>([])

    const [user, setUser] = useState(null as firebase.User | null);
    const [loadingAuthState, setLoadingAuthState] = useState(true);


    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            Storage.set({ key: 'userdata', value: JSON.stringify(userdata) })
            Storage.set({ key: 'picture', value: JSON.stringify(picture) })
            Storage.set({ key: 'message', value: JSON.stringify(message) })
            Storage.set({ key: 'conversationGroup', value: JSON.stringify(conversationGroup) })
            Storage.set({ key: 'conversationNormal', value: JSON.stringify(conversationNormal) })
        } else {
            didMountRef.current = true;
        }
    }, [user, message, conversationGroup, conversationNormal])

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
          setUser(user);
          setLoadingAuthState(false);
       });
    }, []);

    const addUserData = (newUser: UserData) => {
        setUserData((prevState) => {
        let newList = [...prevState];
        newList.unshift(newUser);
        return newList
        })
    }

    const updateUserData = (updateUser: UserData) => {
        const index = userdata.map(el => el.id).indexOf(updateUser.id)
        setUserData((prevState) => {
            let newList = [...prevState];
            newList.splice(index, 1, updateUser)
            return newList
        })
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
        const pictureData = await Storage.get({ key: 'picture' })
        const messageData = await Storage.get({ key: 'message' })
        const conversationNormalData = await Storage.get({ key: 'conversationNormal' })
        const conversationGroupData = await Storage.get({ key: 'conversationGroup' })

        const storedPicture = pictureData.value ? JSON.parse(pictureData.value) : [];
        const storedUserData = userData.value ? JSON.parse(userData.value) : [];
        const storedMessage = messageData.value ? JSON.parse(messageData.value) : [];
        const storedConversationNormal= conversationNormalData.value ? JSON.parse(conversationNormalData.value) : [];
        const storedConversationGroup = conversationGroupData.value ? JSON.parse(conversationGroupData.value) : [];
        
        setUserData(storedUserData)
        setPicture(storedPicture)
        setMessage(storedMessage)
        setConversationNormal(storedConversationNormal)
        setConversationGroup(storedConversationGroup)
    }

    return <AppContext.Provider value={{ initContext, 
        message, 
        conversationGroup, 
        conversationNormal, 
        picture,
        userdata,
        addUserData,
        updateUserData,
        addPicture, 
        updatePicture, 
        addMessage, 
        addConversationGroup, 
        addConversationNormal,  
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState}}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider
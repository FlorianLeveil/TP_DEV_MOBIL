import React from 'react';
import firebase from "../firebase";


export interface ConversationNormal {
    id: String,
    convName: String,
    idUsers: String[],
}

export interface ConversationGroup {
    id: String,
    convName: String,
    idUsers: String[],
    idAdministrator: String,
    pictureProfil: String | null
}

export interface Message {
    id: String,
    idConv: String,
    idUser: String,
    date: number,
    picture: String | null,
    content: String | null
}

export interface Picture {
    id: String,
    filename: string,
    webPath: string,
    base64: string,
}

export interface UserData {
    username: String,
    name: String,
    lastname: String,
    email: String,
    birthdate: String,
    phone: String,
    description: String,
    uid: String,
}

export const defaultUserData: UserData = {
    phone: 'default',
    username: 'default',
    name: 'default',
    lastname: 'default',
    email: 'default',
    birthdate: 'default',
    description: 'default',
    uid: 'default',
}

export const defaultContact: firebase.firestore.DocumentData = {
    uid: 'default',
    contactList: [],
}
    

export type UserInformationFields = "username" | "name" | "lastname" | "email" | "description";

interface AppContext {
    initContext: () => void,

    userdata: UserData,
    setupUserData: (userProps: any) => void,
    updateUserData: (updateUser: UserData) => void,
    updateOneFieldUserData: (updateUser: any, field: string, value: any) => void,

    contacts: firebase.firestore.DocumentData,
    setupContactList: (user: any) => void,
    addContact: (newContact: String) => void,
    removeContact: (contact: String) => void,

    // picture: Picture[]
    // addPicture: (addPicture: Picture) => void,
    // updatePicture: (updatePicture: Picture) => void,

    // message: Message[],
    // addMessage: (message: Message) => void,

    // conversationNormal: ConversationNormal[],
    // addConversationNormal: (conversationNormal: ConversationNormal) => void,

    // conversationGroup: ConversationGroup[],
    // addConversationGroup: (conversationGroup: ConversationGroup) => void,
    user: firebase.User | null,
    authenticated: boolean;
    setUser: any;
    loadingAuthState: boolean;
}

const AppContext = React.createContext<AppContext>({
    initContext: () => { },
    userdata: defaultUserData,
    setupUserData: () => { },
    updateUserData: () => { },
    updateOneFieldUserData: () => {},
    contacts: defaultContact,
    setupContactList: () => { },
    addContact: () => { },
    removeContact: () => { },
    // picture: [],
    // addPicture: () => { },
    // updatePicture: () => { },
    // message: [],
    // addMessage: () => { },
    // conversationNormal: [],
    // addConversationNormal: () => {},
    // conversationGroup: [],
    // addConversationGroup: () => {},
    user: null,
    authenticated: false,
    setUser: () => {},
    loadingAuthState: false,
});

export default AppContext
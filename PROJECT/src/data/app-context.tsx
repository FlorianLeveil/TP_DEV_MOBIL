import React from 'react';
import { Context } from 'vm';
import firebase from "../firebase";
import Contact from '../pages/Contact';


export interface ConversationNormal {
    id: string,
    convName: string,
    idUsers: string[],
}

export interface ConversationGroup {
    id: string,
    convName: string,
    idUsers: string[],
    idAdministrator: string,
    pictureProfil: string | null
}

export interface Message {
    id: string,
    idConv: string,
    idUser: string,
    date: number,
    picture: string | null,
    content: string | null
}

export interface Picture {
    id: string,
    filename: string,
    webPath: string,
    base64: string,
}

export interface UserData {
    username: string,
    name: string,
    lastname: string,
    contact: string,
    email: string,
    birthdate: string,
    phone: string,
    description: string,
    uid: string,
}

export const defaultUserData: UserData = {
    phone: 'default',
    username: 'default',
    name: 'default',
    contact: '',
    lastname: 'default',
    email: 'default',
    birthdate: 'default',
    description: 'default',
    uid: 'default',
}

export interface Contact {
    uidUser: string,
    contactList: string[],
}

export const defaultContact: Contact = {
    uidUser: 'default',
    contactList: []
}

export type UserInformationFields = "username" | "name" | "lastname" | "email" | "description";

interface AppContext {
    initContext: () => void,

    userdata: UserData,
    setupUserData: (userProps: any) => void,
    updateUserData: (updateUser: UserData) => void,
    updateOneFieldUserData: (updateUser: any, field: string, value: any) => void,

    contacts: Contact,
    setupContactList: (user: any) => void,
    addContact: (newContact: string) => void,
    removeContact: (contact: string) => void,

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
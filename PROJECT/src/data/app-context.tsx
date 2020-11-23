import React from 'react';
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
    picture: string | null,
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
    picture: null,
    contact: '',
    lastname: 'default',
    email: 'default',
    birthdate: 'IonLabel',
    description: 'default',
    uid: 'default',
}

export interface Contact {
    uidUser: string,
    contactList: string[],
    myPendingList: string[],
    otPendingList: string[],
    blockedList: string[]
}

export const defaultContact: Contact = {
    uidUser: 'default',
    contactList: [],
    myPendingList: [],
    otPendingList: [],
    blockedList: []
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
    delPendingInvite: (contactId: string) => void,
    refuseInvite: (contactId: string) => void,
    removeContact: (contactId: string) => void,

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
    delPendingInvite: () => { },
    refuseInvite: () => { },
    removeContact: () => { },
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
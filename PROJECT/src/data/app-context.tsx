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
    id: String,
    username: String,
    name: String,
    lastname: String,
    email: String,
    birthdate: String,
    description: String,
}

export type UserInformationFields = "username" | "name" | "lastname" | "email" | "description";



interface AppContext {
    initContext: () => void,

    userdata: UserData[],
    addUserData: (newUser: UserData) => void,
    updateUserData: (updateUser: UserData) => void,

    picture: Picture[]
    addPicture: (addPicture: Picture) => void,
    updatePicture: (updatePicture: Picture) => void,

    message: Message[],
    addMessage: (message: Message) => void,

    conversationNormal: ConversationNormal[],
    addConversationNormal: (conversationNormal: ConversationNormal) => void,

    conversationGroup: ConversationGroup[],
    addConversationGroup: (conversationGroup: ConversationGroup) => void,
    user: firebase.User | null,
    authenticated: boolean;
    setUser: any;
    loadingAuthState: boolean;
}

const AppContext = React.createContext<AppContext>({
    initContext: () => { },
    userdata: [],
    addUserData: () => { },
    updateUserData: () => { },
    picture: [],
    addPicture: () => { },
    updatePicture: () => { },
    message: [],
    addMessage: () => { },
    conversationNormal: [],
    addConversationNormal: () => {},
    conversationGroup: [],
    addConversationGroup: () => {},
    user: null,
    authenticated: false,
    setUser: () => {},
    loadingAuthState: false,
});

export default AppContext
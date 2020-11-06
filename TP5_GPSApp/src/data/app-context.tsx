import React from 'react';

// COORDINATES
export interface Coordinates {
    longitude: number,
    latitude: number,
}

export const defaultCoordinates: Coordinates = {
    longitude: 0,
    latitude: 0,
}

// USER'S PROFILE
export interface Profile {
    name: string,
}

export const defaultProfile: Profile = {
    name: "Unknown",
}

// SETTING UP CONTEXT
interface AppContext {
    initContext: () => void,
    coordinates: Coordinates,
    updateCoordinates: (updatedCoodinates: Coordinates) => void,
    profile: Profile,
    updateProfile: (updatedProfile: Profile) => void
}

const AppContext = React.createContext<AppContext>({
    initContext: () => { },
    coordinates: defaultCoordinates,
    updateCoordinates: () => { },
    profile: defaultProfile,
    updateProfile: () => { }
});

export default AppContext
import React, { useState, useRef, useEffect } from 'react';
import AppContext, { Coordinates, defaultCoordinates, Profile, defaultProfile } from './app-context';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const AppContextProvider: React.FC = (props) => {
    const [coordinates, setCoordinates] = useState<Coordinates>(defaultCoordinates);
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            Storage.set({ key: 'coordinates', value: JSON.stringify(coordinates) })
            Storage.set({ key: 'profile', value: JSON.stringify(profile) })
        } else {
            didMountRef.current = true;
        }
    }, [coordinates, profile])

    const updateCoordinates = (updateCoodinates: Coordinates) => {
        setCoordinates(updateCoodinates)
    }

    const updateProfile = (updateProfile: Profile) => {
        setProfile(updateProfile)
    }

    const initContext = async () => {
        const profileData = await Storage.get({ key: 'profile' });
        const coordinatesData = await Storage.get({ key: 'coordinates' });
        const storedProfile = profileData.value ? JSON.parse(profileData.value) : defaultProfile;
        const storedCoordinates = coordinatesData.value ? JSON.parse(coordinatesData.value) : defaultCoordinates;
        didMountRef.current = false;
        setProfile(storedProfile);
        setCoordinates(storedCoordinates);
    }

    return <AppContext.Provider value={{ initContext, coordinates, updateCoordinates, profile, updateProfile }}>
        {props.children}
    </AppContext.Provider>
}

export default AppContextProvider
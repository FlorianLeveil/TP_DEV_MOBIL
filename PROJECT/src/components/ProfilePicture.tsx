import { CameraResultType, CameraSource, FilesystemDirectory, Plugins } from '@capacitor/core'
import { IonButton, IonCol, IonFabButton, IonGrid, IonIcon, IonListHeader, IonRow } from '@ionic/react'
import { base64FromPath } from '@ionic/react-hooks/filesystem'
import AppContext, { Picture} from '../data/app-context';
import React, { useContext, useEffect, useState } from 'react';
import defaultProfile from '../assets/defaultProfile.jpg';
import { camera } from 'ionicons/icons';
import userEvent from '@testing-library/user-event';

const { Camera, Filesystem } = Plugins;



const UserPicture: React.FC<{user: string}> = (props) => {
    // const appCtx = useContext(AppContext);

    // const takePhotoHandler = async () => {
    //     const photo = await Camera.getPhoto({
    //         quality: 80,
    //         resultType: CameraResultType.Uri,
    //         source: CameraSource.Prompt,
    //         width: 500,
    //     });

    //     if (!photo || !photo.webPath) return

    //     const base64 = await base64FromPath(photo.webPath)
    //     const fileName = new Date().getTime() + '.jpeg'
    //     const newPicture: Picture = {
    //         id: 'idk',
    //         filename: fileName,
    //         webPath: photo.webPath,
    //         base64: base64,
    //     }

    //     props.user.picture = newPicture
    // }

    // return (
    //     <IonCol size="6" sizeSm="5" sizeMd="3" sizeLg="2" className="ion-text-center ion-padding">
    //         <div className="profile-picture" style={{ backgroundImage: `url(${props.user.picture.base64 ? props.user.picture.base64 : defaultProfile})` }} />
    //         <IonFabButton style={{ position: 'absolute', top: "15px", right: "0" }} color="danger" onClick={takePhotoHandler}>
    //             <IonIcon icon={camera} />
    //         </IonFabButton>
    //     </IonCol>
    // )
    return (
        <IonCol></IonCol>
    )
}

export default UserPicture
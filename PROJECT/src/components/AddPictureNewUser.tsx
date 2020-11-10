import { CameraResultType, CameraSource, FilesystemDirectory, Plugins } from '@capacitor/core'
import { IonButton, IonCol, IonGrid, IonIcon, IonListHeader, IonRow } from '@ionic/react'
import { base64FromPath } from '@ionic/react-hooks/filesystem'
import { cameraOutline } from 'ionicons/icons'
import AppContext, { Picture } from '../data/app-context';

import React, { useState } from 'react'
import defaultImg from '../assets/default.png'

const { Camera } = Plugins;

const AddPictureNewUser: React.FC<{ updatePicture: (picture: Picture) => void}> = (props) => {
    const [picture, setPicture] = useState<Picture>()

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            quality: 80,
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            width: 500,
        });

        if (!photo || !photo.webPath) return

        const base64 = await base64FromPath(photo.webPath)
        const fileName = new Date().getTime() + '.jpeg'
        const newPicture: Picture = {
            id: '',
            filename: fileName,
            webPath: photo.webPath,
            base64: base64,
        }
        setPicture(newPicture)
        props.updatePicture(newPicture)
    }

    return (
        <div id="AddPictureNewApartment">
            <IonListHeader className="ion-margin-top">Pictures</IonListHeader>
            <IonGrid>
                <IonRow className="ion-align-items-center ion-padding-top">
                    <IonCol>
                        <div className="img-container" style={{ backgroundImage: `url(${picture ? picture.webPath : defaultImg})` }} />
                    </IonCol>
                    <IonCol>
                        <IonButton onClick={takePhotoHandler} className="ion-margin"><IonIcon icon={cameraOutline} /></IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    )
}

export default AddPictureNewUser
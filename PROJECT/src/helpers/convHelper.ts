import firebase from '../firebase';

export const checkConv = (userId: string, otherId: string) => {
    let response: boolean = false;

    firebase.firestore().collection('Conversations')
        .where("users", "array-contains", userId)
        .get().then(async (res) => {
            for(const conv of res.docs) {
                if ( conv.data().users.length === 2 && conv.data().users.includes(otherId)) {
                    response = true;
                    return;
                } else {
                    response = false;
                }
            }
        })

    return response;
}
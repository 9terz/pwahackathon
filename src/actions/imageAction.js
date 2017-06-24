import { storageRef } from './database';

export function upLoadImage(dispatch, img) {
    console.log('upload image action called');
        const imgRef = storageRef.child('555.jpg');
        console.log(img.replace('data:image/jpeg;base64,',''))
        imgRef.putString(img.replace('data:image/jpeg;base64,',''),'base64')
        .then((snapshot) => {
            console.log('Uploaded a raw string!');
          });

        return dispatch(upLoadImagePrep(img));

        // const guestsRef = database.ref('/guests');
        // guestsRef.push({
        //     img
        // })
        // .then(() => {
        //     // dispatch(addToInviteFulfilledAction({ name }));
        // })
        // .catch((error) => {
        //     // dispatch(addToInviteRejectedAction());
        // });
}

function upLoadImagePrep(img) {
  return {
        type: "UPLOAD",
        payload: img
    };
}
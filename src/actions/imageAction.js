import { storageRef } from './database';

export function upLoadImage(img) {
    return dispatch => {
        console.log('upload image action called');
        var imgRef = storageRef.child('xxx.jpg');
        
        dispatch(upLoadImagePrep(img));
        
        imgRef.putString(img)
        .then(function(snapshot) {
            console.log('Uploaded a raw string!');
        });
        
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
}

function upLoadImagePrep() {
  return {
        type: "UPLOAD",
        payload: img
    };
}
import { storageRef } from './database';

export function upLoadImage(dispatch, img) {
    console.log('upload image action called');
        var imgRef = storageRef.child('xxx.jpg');

        imgRef.putString(img)
        .then(function(snapshot) {
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
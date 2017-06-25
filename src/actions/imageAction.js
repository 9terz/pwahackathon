import { database, storageRef } from './database';

export function setResult(dispatch, result) {
    return {
        type: "SET_RESULT",
        payload: result
    }
}
export function decrementOpacity(dispatch, amount){
    return {
        type: "DEC_OPACITY",
        payload: amount
    }
}
export function setOpacity(dispatch, num) {
    return {
        type: "SET_OPACITY",
        payload: num
    }
}
export function upLoadImage(dispatch, img) {
    console.log('upload image action called');
    console.log(img);
    const imgName = ''+new Date().valueOf()+'.jpg';
    var imgRef = storageRef.child(imgName);
    img = img.replace('data:image/jpeg;base64,', '');
    console.log(img);
    imgRef.putString(img, 'base64')
    .then((snapshot) => {
        console.log('Uploaded a raw string!');
    });
    dispatch(storeImgName(imgName));
    return dispatch(upLoadImagePrep(img));
}
function upLoadImagePrep(img) {
  return {
        type: "UPLOAD",
        payload: img
    };
}

function storeImgName(name) {
    return {
        type: "SET_NAME",
        payload: name
    };
}
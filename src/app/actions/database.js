import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCuaC56vGOLjrNxKQlE1u5mxBHKrcVudng",
    authDomain: "appforthaipeople.firebaseapp.com",
    databaseURL: "https://appforthaipeople.firebaseio.com",
    projectId: "appforthaipeople",
    storageBucket: "appforthaipeople.appspot.com",
    messagingSenderId: "821370704398"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const storageRef = firebase.storage().ref();

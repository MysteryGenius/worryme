import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA-_DndAGdZZmdu7MyB-tmYNUpcC-7ZKJg",
    authDomain: "worry-me.firebaseapp.com",
    databaseURL: "https://worry-me.firebaseio.com",
    projectId: "worry-me",
    storageBucket: "worry-me.appspot.com",
    messagingSenderId: "963419803368",
    appId: "1:963419803368:web:a9c3342743fa118434c35d"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
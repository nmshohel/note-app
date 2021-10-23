// import * as firebase from "firebase/app";
import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjwF3t7s_uq7dyvXrSlOKTq50FCtdqEfA",
    authDomain: "note-app-ab7c0.firebaseapp.com",
    projectId: "note-app-ab7c0",
    storageBucket: "note-app-ab7c0.appspot.com",
    messagingSenderId: "388284450991",
    appId: "1:388284450991:web:9599e588f43563ab39ec5a"
  };

if(!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
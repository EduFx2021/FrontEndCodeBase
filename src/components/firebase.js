import * as firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDDRAqZUroRQja3EeHhhYnH_ZJEcPJuw6s",
    authDomain: "edu-fx.firebaseapp.com",
    projectId: "edu-fx",
    storageBucket: "edu-fx.appspot.com",
    messagingSenderId: "554334787373",
    appId: "1:554334787373:web:7f50364e9a7f8704fca5a4",
    measurementId: "G-3MJLTLSLV9"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

export default firebase;
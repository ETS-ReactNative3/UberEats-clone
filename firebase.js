
 import "firebase/compat/auth"
import "firebase/compat/firestore"
import firebase from 'firebase/compat/app';





const firebaseConfig = {
    apiKey: "AIzaSyBz9U-vRCfBzYxWWls7ukR17k3MWit_wOk",
    authDomain: "ubereatsclone-13fbb.firebaseapp.com",
    projectId: "ubereatsclone-13fbb",
    storageBucket: "ubereatsclone-13fbb.appspot.com",
    messagingSenderId: "368292546381",
    appId: "1:368292546381:web:b92f001cf4c23c4ce01904",
    measurementId: "G-186DGTQ23D"
  };

  

  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  export default firebase;
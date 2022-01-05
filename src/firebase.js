import firebase from "firebase";

const configfb = {
  /////new//// Jan 3 2021
  apiKey: "AIzaSyAXxp-cmzN2zEcVxGuDiIQUVSis2JSNcFI",
  authDomain: "tuc-shopping-dev.firebaseapp.com",
  projectId: "tuc-shopping-dev",
  storageBucket: "tuc-shopping-dev.appspot.com",
  messagingSenderId: "56861130108",
  appId: "1:56861130108:web:e2a2a5f50d9d29dd9ef8f9",
};
firebase.initializeApp(configfb);

export default firebase;

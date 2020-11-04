import * as firebase from 'firebase/app';

const PROJECT_ID = "jachlo-3e151";

const firebaseConfig = {
    apiKey: "AIzaSyA6H-ofHTkXfPAvsrTI7Coh2VIk4s-4m1g",
    authDomain: `${PROJECT_ID}.firebaseapp.com`,
    databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
    projectId: PROJECT_ID,
    storageBucket: `${PROJECT_ID}.appspot.com`,
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
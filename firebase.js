import { firebase } from '@firebase/app'
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC2XoGFbyrN1nNp2ktMNb8pUSJvbV4TkiM",
    authDomain: "couple-8322c.firebaseapp.com",
    projectId: "couple-8322c",
    storageBucket: "couple-8322c.appspot.com",
    messagingSenderId: "281731300",
    appId: "1:281731300:web:32e9e53d5b59fcc32dccf1"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
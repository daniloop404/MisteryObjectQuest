import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage'; // Asegúrate de que esto está importado

const firebaseConfig = {
    apiKey: "AIzaSyCJSTfl-zgDjB4yfsYyZaxWuflGIUMtfYE",
    authDomain: "movil-game-9e95f.firebaseapp.com",
    databaseURL: "https://movil-game-9e95f-default-rtdb.firebaseio.com",
    projectId: "movil-game-9e95f",
    storageBucket: "movil-game-9e95f.appspot.com",
    messagingSenderId: "631897875519",
    appId: "1:631897875519:web:597c6f4a8721f9d9fb048a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
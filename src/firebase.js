import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
        // Check inside "Configs" repo.
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
});

const db = firebaseApp.firestore();
export default db;
/* ==========================================
        FIREBASE CONFIGURATION
========================================== */
/*
Firebase Config
Ye values tumhare Firebase Project se aayengi.
*/
const firebaseConfig = {

    apiKey: "AIzaSyAlHLgdwLI6m-nSAho2KSAL59N2tzzxBwA",
  authDomain: "dheeraj-official.firebaseapp.com",
  projectId: "dheeraj-official",
  storageBucket: "dheeraj-official.firebasestorage.app",
  messagingSenderId: "832117938509",
  appId: "1:832117938509:web:2f7f65fcf74451015b3f04"
};
/*
Firebase Initialize
*/
firebase.initializeApp(firebaseConfig);
/*
Authentication
Object
*/
const auth = firebase.auth();
/*
Database
Object
*/
const db = firebase.firestore();
console.log("Firebase Connected Successfully 🚀");
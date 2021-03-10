const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyArNFCDtGXORek260t00Eq6j7UefiiWA0I",
        authDomain: "kiei-451-bd7ba.firebaseapp.com",
        projectId: "kiei-451-bd7ba",
        storageBucket: "kiei-451-bd7ba.appspot.com",
        messagingSenderId: "115378137779",
        appId: "1:115378137779:web:22b50517a638f3a54a1ec6"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";;
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD57CPZdMBLyK-X3up3kW6Qn2GQ8aovnxI",
    authDomain: "neptun-501aa.firebaseapp.com",
    projectId: "neptun-501aa",
    storageBucket: "neptun-501aa.appspot.com",
    messagingSenderId: "465826868791",
    appId: "1:465826868791:web:b0de1d6b41de3309d159b2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

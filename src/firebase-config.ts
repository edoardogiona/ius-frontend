import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBempJ9gj6Gyw3SJsEDfT90cCsZnxON9MM",
    authDomain: "ius-project-96243.firebaseapp.com",
    projectId: "ius-project-96243",
    storageBucket: "ius-project-96243.appspot.com",
    messagingSenderId: "346984456474",
    appId: "1:346984456474:web:e58e189d6c6a44d27a4ca3",
    measurementId: "G-8HMQBPLQ8W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

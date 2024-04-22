import React, {useContext, useEffect, useState} from "react";
import {signOut} from "firebase/auth";
import {auth, db} from "../../../firebase-config";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../context/userContext";
import {
    collection,
    addDoc,
    collectionGroup,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import firebase from "firebase/compat";

export default function PrivateHome() {
    // Logout
    const navigate = useNavigate();
    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err) {
            alert("log out impossible, check internet connection");
        }
    };

    // Get currentUser data
    const {currentUser} = useContext(UserContext);

    // Firestore data logic
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const usersCollection = collection(db, "users");
        const q = query(
            usersCollection,
            where(firebase.firestore.FieldPath.documentId(), "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            let users: any = [];
            snapshot.docs.forEach((doc) => {
                users.push({...doc.data(), id: doc.id});
            });
            setUsers(users);
        });
        return () => unsubscribe();
    }, []);

    // Front
    return (
        <>
            <h1>Private Home</h1>
            <p>You can access this page only of you're sign in</p>

            {/*currentUser Data*/}
            <p>{currentUser.email}</p>
            <p>{currentUser.uid}</p>

            {/*Collection users Data*/}
            <p>{users.map((user: any) => user.role)}</p>

            <button onClick={logOut}>log Out</button>
        </>
    );
}

import React, {createContext, useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase-config";

export const UserContext = createContext<any>(null)

export function UserContextProvider(props: any){

    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (currentUser: any) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        });
    }, []);

    return(
        <UserContext.Provider value={{currentUser}}>
            {!loadingData && props.children}
        </UserContext.Provider>

    )
}
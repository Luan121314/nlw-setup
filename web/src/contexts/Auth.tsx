import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebaseAuth } from "../lib/firebase";

export type UserProps = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: UserProps | undefined;
    signInWithGoogle: () => Promise<void>;
};

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    console.log('usercontext', user);

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             const { displayName, email, uid } = user;
    //             if (!displayName || !email) {
    //                 throw new Error('Missing information from Google Account');
    //             }
    //             setUser({
    //                 id: uid,
    //                 name: displayName,
    //                 email: email
    //             });
    //         }
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    useEffect(()=>{
        console.log('mutting state', user);

    }, [user])

    async function signInWithGoogle(){
        const provider = new firebaseAuth.GoogleAuthProvider()
        const result = await firebaseAuth.signInWithPopup(auth, provider)

        console.log('process auth', result);

        if(result.user){
            const {email, uid, displayName} = result.user
            if(!email || !displayName){
                console.log('error');

                throw new Error('Missing infirmation from Google Account')
            }

            console.log('state modified');

            setUser({
                id: uid,
                name: displayName,
                email: email
            })
        }
    }

    return <AuthContext.Provider value={{signInWithGoogle, user}} >{children}</AuthContext.Provider>
}

export default AuthContext

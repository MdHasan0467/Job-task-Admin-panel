
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.init";



const auth = getAuth(app)

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {







    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



    // const googleProvider = new GoogleAuthProvider();
    // const facebookProvider = new FacebookAuthProvider();





//! User create 

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

//! Update profile
const updateUser = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
    });
};

//! User sign in 

const userSingIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
}

//! Google sign in 

// const googleSignIn = () =>{
//     setLoading(true);
//     return signInWithPopup(auth , googleProvider)
// }

//! Facebook sign in 

// const facebookSignIn = () =>{
//   return signInWithPopup(auth , facebookProvider)
// }



//! logOut
const logOut = () => {
  setLoading(true);
  localStorage.removeItem('accessToken')
  return signOut(auth);
};


useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);



    const authInfo = {
        createUser,
        updateUser,
        userSingIn,
        // googleSignIn,
        // facebookSignIn,
        loading,
        user,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


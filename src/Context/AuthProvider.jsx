import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.init";



const auth = getAuth(app)

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {







    const [user, setUser] = useState(null);
    const [logUser, setLogUser] = useState(null);
    const [loading, setLoading] = useState(true);




// ! Get login User from database

useEffect(() => {
	fetch(`http://localhost:5000/user/${user?.email}`)
		.then((res) => res.json())
		.then((result) => {
			setLogUser(result?.result);
		});
}, [user?.email]);    





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

console.log(logUser);

    const authInfo = {
        createUser,
        updateUser,
        userSingIn,
        loading,
        user,
        logUser,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


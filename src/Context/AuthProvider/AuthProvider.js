import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const context = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  const createUser = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        console.log(result);
        setLoader(true);
        alert("User Created.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const login = (email, pass) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const update = (name, url) => {
    const info = {
      displayName: name,
      photoURL: url,
    };
    updateProfile(user, info);
  };

  const logOut = () => {
    localStorage.removeItem("acces-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = { user, loader, createUser, login, update, logOut };
  return <context.Provider value={authInfo}>{children}</context.Provider>;
};

export default AuthProvider;

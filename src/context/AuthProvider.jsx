import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";

// 1 - create context
const AuthContext = createContext();

//* custom hook
export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
    // console.log(displayName);
    try {
      // new user create method from firebase
      let newUser = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName,
      });
      // console.log(newUser);
      // console.log(currentUser);
      navigate("/login");
      toastSuccessNotify("Registered succesfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const userSignIn = async (email, password) => {
    try {
      // login for user
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(newUser);
      console.log(currentUser);

      navigate("/");
      toastSuccessNotify("Logged succesfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const userLogOut = async () => {
    try {
      signOut(auth);
      toastSuccessNotify("You have logged out");
      navigate("/login");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  //   bir kere çalıştırmamız yeterli giriş çıkışları kontrol eden firebase metodu
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
      } else {
        // User is signed out
        // console.log("logged out");
        setCurrentUser(false);
      }
    });
  };

  const googleProvider = () => {
    //? Google ile giriş yapılması için kullanılan firebase metodu
    const provider = new GoogleAuthProvider();
    //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => {
    // set new password with email firebase method
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        toastWarnNotify("Please check your mail box!");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const values = {
    currentUser,
    createUser,
    userSignIn,
    userLogOut,
    googleProvider,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

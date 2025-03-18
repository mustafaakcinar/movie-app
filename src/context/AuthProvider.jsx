import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
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

  const createUser = async (email, password) => {
    try {
      // new user create method from firebase
      let newUser = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(newUser);
      navigate("/login");
      toastSuccessNotify("Registered succesfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      // login for user
     await signInWithEmailAndPassword(auth, email, password);
      // console.log(newUser);
      navigate("/");
      toastSuccessNotify("Logged succesfully");
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };

  const values = { currentUser, createUser, signIn };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

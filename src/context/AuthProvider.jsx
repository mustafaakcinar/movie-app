import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { createContext, useContext, useState } from 'react'
import {auth} from '../auth/firebase'

// 1 - create context
const AuthContext = createContext()

//* custom hook
export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(false)

    const createUser = async () => {
        try {
            // new user create method from firebase
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error);
        }
    }



    const values = {currentUser, createUser, }
  return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
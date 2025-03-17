import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { createContext, useContext, useState } from 'react'
import {auth} from '../auth/firebase'
import { useNavigate } from 'react-router-dom'

// 1 - create context
const AuthContext = createContext()

//* custom hook
export const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(false)
    const navigate = useNavigate()

    const createUser = async (email,password) => {
        try {
            // new user create method from firebase
            let newUser = await createUserWithEmailAndPassword(auth, email, password)
            // console.log(newUser);
            navigate("/login")

        } catch (error) {
            console.log(error);
        }
    }



    const values = {currentUser, createUser }
  return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
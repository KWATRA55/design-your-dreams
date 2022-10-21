import React from 'react'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import { useHistory } from "react-router-dom"

async function LoginAsFreelancer(email, password) {
        const navigate = useHistory()
        try{
          const user = await signInWithEmailAndPassword(auth, email, password)
          console.log(user)

            try{
                navigate.push({
                pathname : `freelancerdashboard`,
                state : {email: email}
            }) 
            } catch(err){
                console.log(err, "function error")
            }
           } 
          catch (error) {
            console.log(error.message)
        }
      

  return (
    <div></div>
  )
}

export default LoginAsFreelancer
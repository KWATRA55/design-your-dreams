import React, {useEffect, useState} from 'react'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import { useHistory } from "react-router-dom"


async function LoginAsCompany(loginEmail, loginPassword, auth) {
    //const navigate = useHistory()
    try{
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        console.log(user)
        // navigate.push({
        //   pathname : `companydashboard`,
        //   state : {email: loginEmail}
        // })
        
      } catch (error) {
          console.log(error.message)
      }

  return (
    <div></div>
  )
}

export default LoginAsCompany
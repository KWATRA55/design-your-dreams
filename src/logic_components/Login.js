import React, {useEffect, useState} from 'react'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import { useHistory } from "react-router-dom"



function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState('');

  //onAuthStateChanged(auth, (currentUser) => {
  //  setUser(currentUser);
  //});

  const navigate = useHistory();

  const NavigateToRegister = () => {
    const navigate = useHistory();
    navigate.push('/register')
  }

  const loginAsCompany = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
      setUser(auth.currentUser)
      navigate.push({
        pathname : `companydashboard`,
        state : {email: loginEmail}
      })
      
    } catch (error) {
        console.log(error.message)
    }
  }

  const loginAsFreelancer = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user)
      setUser(auth.currentUser)

      navigate.push({
        pathname : `freelancerdashboard`,
        state : {email: loginEmail}
      })    } catch (error) {
        console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth);
    setUser('')
  }
  useEffect(() => {
    logout();
  })

  return (
    <div className="App">

      <div>
        <h3> Login </h3>
        <input
          id='loginEmail'
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value)
          }}
        />
        <input
          id='loginPassword'
          placeholder="Password..." type='password'
          onChange={(event) => {
            setLoginPassword(event.target.value)
          }}
        /><br /><br />

        <button onClick={loginAsFreelancer}> Login as Freelancer</button>
        <button onClick={loginAsCompany}> Login as Company</button>
      </div>

     
        
      <h3 className='mt-5'>New User : </h3>
      <button onClick={NavigateToRegister}>Register</button>
    </div>
  )
}

export default Login
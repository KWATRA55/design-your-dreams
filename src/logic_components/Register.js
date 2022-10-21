import React, {useState} from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import { useHistory } from "react-router-dom"


function Register() {

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [user, setUser] = useState('');

    const register = async () => {
        try{
          const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
          console.log(user)
          setUser(auth.currentUser)
          document.getElementById('registerEmail').value='';
          document.getElementById('registerPassword').value='';

          navigate.push('/loginas', {state : {email: registerEmail}})
        } catch (error) {
            console.log(error.message)
        }
      }

      const navigate = useHistory();

      const navigateToLogin = () => {
        navigate.push('/login')
      }

  return (
    <div className='m-5'>
        <h3>Register</h3>
      <input
          id='registerEmail'
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value)
          }}
      />

      <input
          id='registerPassword'
          placeholder="Password..." type='password'
          onChange={(event) => {
            setRegisterPassword(event.target.value)
          }}
      />

      <button onClick={register}> Create User</button>
      <br />
      <h3 className='mt-5'>Already have an account : </h3>
      <button onClick={navigateToLogin}>Login</button>
    </div>
  )
}

export default Register
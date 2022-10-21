import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>Chat app</span>
      <div className='user'>
        <img src='https://images.pexels.com/photos/13957041/pexels-photo-13957041.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' />
        <span>{currentUser ? currentUser.displayName : ''}</span>
      </div>
    </div>
  )
}

export default Navbar
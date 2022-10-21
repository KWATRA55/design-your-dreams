import React from 'react'
import Sidebar from './chat_components/Sidebar'
import Chat from './chat_components/Chat'
import './chat_components/style.scss'

const test = () => {
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default test
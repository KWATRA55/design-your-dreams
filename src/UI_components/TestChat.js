import React, {useState, useEffect}  from 'react'
import {db} from '../config/firebase-config'
import { getDatabase, ref, onValue, set} from "firebase/database";
import { v4 as uuid } from 'uuid';

function TestChat() {

    const[chats, setChats] = useState([])
    const[newChat, setNewChat] = useState()

    const uid = 'abcd'

    function writeUserData() {
        const unique_id = Date.now() + uuid().slice(0,8);

        set(ref(db, 'chats/' + uid + '/' + unique_id), {
          content: newChat,
          timestamp: Date.now()
        });

        document.getElementById('chatbox').value = ""
      }

    const getUserData = () => {
        const dataRef = ref(db, 'chats/' + uid);
        onValue(dataRef, (snapshot) => {
            const data = []
            snapshot.forEach((snap) => {
              data.push(snap.val());
            })
            setChats(data)
        });
    }
    
    useEffect(() => {
        getUserData()
    }, [])
    // writeUserData('test content', 'abcdef')

  return (
    <div className='App'>
        <h2>Chats : </h2>
        <h3>
        {chats.map((chat) => (
           <div key={chat.timestamp}>{chat.content}</div>
        ))}
       </h3><br/><br/>

       <input type='text' placeholder="chat" id='chatbox'
        onChange={(e) => {setNewChat(e.target.value)}}/>
        <button onClick={writeUserData}>send</button>
    </div>
  )
}

export default TestChat
import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc } from "firebase/firestore";
import {db} from '../../config/Firebase'
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  //const [search, setSearch] = useState(location.state.search)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const freelancersCollectionRef = collection(db, 'freelancers')
    const q = query(freelancersCollectionRef, where("username", '==', username ? username : location.state?.search ))

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    }catch(err){
        setErr(true)
    }
  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.user_id ? currentUser.uid + user.user_id : user.user_id + currentUser.uid;
    try{
      const res = await getDoc(doc(db, "chats", combinedId))

      if(!res.exists()){
        //create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages : []})

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"] : {
            uid : user.user_id,
            displayName : user.username,
          },
          [combinedId + '.date'] : serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", user.user_id), {
          [combinedId + ".userInfo"] : {
            uid : currentUser.uid,
            displayName : currentUser.displayName,
          },
          [combinedId + '.date'] : serverTimestamp()
        })
      }
    }catch(err){
      setUser(null)
      setUsername("")
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])

  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='userChat' onClick={handleSelect} value={username}>
        <img src='' alt=''/>
        <div className='userChatInfo'>
          <span>{user.username}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
import { useLocation } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import React, {useState, useEffect}  from 'react'
import {db} from '../config/Firebase'
import { useHistory } from "react-router-dom"



function FreelancerDashboard() {
    const[freelancer, setFreelancer] = useState({})
    //const freelancerCollectionRef = collection(db, 'freelancers')
    const location = useLocation();

    const navigate = useHistory();

    // const getUsers = async () => {
    //     const data = await getDocs(freelancerCollectionRef)
    //     setUsers(data.docs.map((doc) => ({...doc.data()})))
    // }
    const getUser = async() => {
        const docRef = doc(db, "freelancers", location.state.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setFreelancer(docSnap.data())
            //console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const logout = async () => {
        await signOut(auth);
        setFreelancer({})

        navigate.push('/login');
    }
    
    
    useEffect(() => {
        getUser()
    }, [])

    // setTimeout(function(){
    //     users.map(async (user) => {
    //         if(user.mail === location.state.mail){
    //             setFreelancer(user) 
    //         }
    //     })
    // }, 100)

    return(
        <div>
            <h3>Freelancer Details : </h3>
            <h4>Name : {freelancer.username}</h4>
            <h4>Mail : {freelancer.mail}</h4>
            <br/><br/>
            <button onClick={logout}>Logout</button>
        </div>
    )
  }

export default FreelancerDashboard
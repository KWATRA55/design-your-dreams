import { collection, getDocs } from 'firebase/firestore'
import React, {useState, useEffect}  from 'react'
import {db} from '../Firebase'


function Freelancer() {
    const [freelancers, setFreelancers] = useState([])
    const freelancerCollectionRef = collection(db, 'freelancers')

    useEffect(() => {
        const getFreelancers = async () => {
            const data = await getDocs(freelancerCollectionRef)
            setFreelancers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getFreelancers();
    }, [])
  return (
    <div>
        {freelancers.map((user) => {
            return (
                <div>
                    <h1>Name : {user.username}</h1>
                </div>
            )
        })}
    </div>
  )
}

export default Freelancer
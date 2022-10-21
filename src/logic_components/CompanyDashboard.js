import { collection, getDocs,  doc, getDoc } from 'firebase/firestore'
import React, {useState, useEffect}  from 'react'
import {db} from '../config/Firebase'
import { useLocation, useHistory } from "react-router-dom";
import { signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'

function CompanyDashboard() {
    const [freelancers, setFreelancers] = useState([])
    const freelancerCollectionRef = collection(db, 'freelancers')

    const location = useLocation();
    const navigate = useHistory();
    const[company, setCompany] = useState({});

    const getCompany = async() => {
        const docRef = doc(db, "company_users", location.state.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setCompany(docSnap.data())
            //console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const getFreelancers = async () => {
        const data = await getDocs(freelancerCollectionRef)
        setFreelancers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    const logout = async () => {
        await signOut(auth);
        setCompany({})

        navigate.push('/login');
    }


    useEffect(() => {
            console.log(location.state.email)
            getCompany();
            getFreelancers();
        
    }, [])
  return (
    <div>
        <h3>Company Info :</h3>
        <h5>Company Name : {company.company_name}</h5>
        <h5>Mail :{company.mail}</h5>
        <br /><br />

        <h3>Freelancers : </h3>
        {freelancers.map((user) => {
            return (
                <div>
                    <h1>Name : {user.username}</h1>
                </div>
            )
        })}
        <br/><br/>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default CompanyDashboard
import { useLocation } from "react-router-dom";
import { collection, getDocs, doc, getDoc,query, where, onSnapshot } from 'firebase/firestore'
import { signOut} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import React, {useState, useEffect}  from 'react'
import {db} from '../config/Firebase'
import { useHistory } from "react-router-dom"


import Card from '../components/Card'
import { Row, Col, Container} from 'react-bootstrap'


import Header from '../components/partials/dashboard/headerStyle/header'
import RightSidebar from '../components/partials/dashboard/sidebarStyle/rightsidebar'
import Sidebar from '../components/partials/dashboard/sidebarStyle/sidebar'
import Footer from '../components/partials/dashboard/footerStyle/footer'


function FreelancerDashboard(props) {

    const freelancerCollectionRef = collection(db, 'freelancers')

    const[freelancer, setFreelancer] = useState({})
    const location = useLocation();
    const navigate = useHistory();

    const getUser = async () => {
        const q = query(freelancerCollectionRef, where("mail", "==", location.state.email))
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setFreelancer(doc.data())
            })
    })}

    const clickChat = () => {
        navigate.push({
            pathname : `chat`
        })
    } 

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
        <Header />
        <Sidebar />
        <RightSidebar />

    <Card id="post-modal-data" className="card-block card-stretch card-height">
        <div className="card-header d-flex justify-content-between">
            <div className="header-title d-grid">
                <h4 className="card-title">Freelancer Name : {freelancer.username}</h4>
                <h5>Freelancer Mail : {freelancer.mail}</h5>
            </div>
        </div>
    </Card>
    <button onClick={clickChat}>chat</button>
    </div>
  )
}

export default FreelancerDashboard
import { collection, getDocs,  doc, getDoc, query, where, onSnapshot } from 'firebase/firestore'
import React, {useState, useEffect}  from 'react'
import {auth} from '../config/firebase-config'
import {db} from '../config/Firebase'
import { useLocation, useHistory } from "react-router-dom";
import Select from 'react-select';

//router
import { Switch,Route } from 'react-router'

//layoutpages
import Default from '../layouts/dashboard/default'
import WithoutLeftSidebar from '../layouts/dashboard/without-leftsidebar'   
import WithoutRightSidebar from '../layouts/dashboard/without-rightsidebar'   
import Layout1 from '../layouts/dashboard/layout-1'   
import Simple from '../layouts/dashboard/simple'

import Card from '../components/Card'
import { Row, Col, Container} from 'react-bootstrap'

import Header from '../components/partials/dashboard/headerStyle/header'
import RightSidebar from '../components/partials/dashboard/sidebarStyle/rightsidebar'
import Sidebar from '../components/partials/dashboard/sidebarStyle/sidebar'
import Footer from '../components/partials/dashboard/footerStyle/footer'



function CompanyDashboard(props) {
    const location = useLocation();
    const navigate = useHistory();

    const [freelancers, setFreelancers] = useState([])
    const[company, setCompany] = useState({});
    const [departments, setDepartments] = useState([])

    const freelancerCollectionRef = collection(db, 'freelancers')

    const getDepartments = async() => {  
        const docRef = doc(db, "departments", 'departments');
        const docSnap = await getDoc(docRef);
        let items = docSnap.data().departments

        const depts = []
        for(let i=0; i<items.length; i++){
            depts.push({value : items[i], label : items[i]})
        }
        setDepartments(depts)
    }

    // var options = [
    //     { value: 'Front End Development', label: 'Front End Development' },
    //     { value: 'Human Resources', label: 'Human Resources' },
    //     { value: 'Backend Development', label: 'Backend Development' },
    //     { value: 'Full Stack Development', label: 'Full Stack Development' },
    //     { value: 'Data Analyst', label: 'Data Analyst' },
    //     { value: 'Product Analyst', label: 'Product Analyst' }
    // ];

    const logChange = async (option) => {
        const q = query(freelancerCollectionRef, where("departments", "==", option.value))
        onSnapshot(q, (snapshot) => {
            const data = []
            snapshot.docs.forEach((doc) => {
                data.push({...doc.data(), id: doc.id})
            })
            setFreelancers(data)
    })
    }

    const getFreelancers = async () => {
        const data = await getDocs(freelancerCollectionRef)
        setFreelancers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    const getCompany = async () => {
        const companyCollectionRef = collection(db, 'company_users')
        const q = query(companyCollectionRef, where("mail", "==", location.state.email))
        onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                setCompany(doc.data())
            })
    })}

    const clickChat = (name) => {
        navigate.push({
            pathname : `chat`,
            state : {search : name}
        })
    } 

    useEffect(() => {
        getCompany()
        getFreelancers()
        getDepartments()
    }, [])


  return (
    <div>
        <Header />
        <Sidebar />
        <RightSidebar />

    <Card id="post-modal-data" className="card-block card-stretch card-height">
        <div className="card-header d-flex justify-content-between">
            <div className="header-title d-grid">
                <h4 className="card-title">Company Name : {company.company_name}</h4>
                <h5>Company Mail : {company.mail}</h5>
            </div>
        </div>
    </Card>

    <Card  className="card-block card-stretch card-height">
    <div className="card-header d-flex justify-content-between">
        <h4 className="card-title">filter departments</h4>
        <div style={{width: 600}}>
            {<Select options={departments} onChange={logChange} />}
        </div>
    </div>
    
    </Card>

    <h2 className='m-3'>Freelancers Available :</h2>

    {freelancers.map((user) => {
        return (
            <div>
                <Row className='m-5'>
                    <Col lg={8} className="row m-0 p-0">
                        <Col sm={12} >
                            <Card id="post-modal-data" className="card-block card-stretch card-height">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="header-title">
                                    <h4 className="card-title">{user.username}</h4>
                                    <h5 className="card-body">{user.mail}</h5>
                                    </div>
                                    <button onClick={() => clickChat(user.username)}>chat</button>
                                </div>
                            <Card.Body></Card.Body>
                            </Card>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
        })}

    <Footer />

    </div>
  )
}

export default CompanyDashboard
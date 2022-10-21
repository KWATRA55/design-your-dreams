import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import React, {useEffect, useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import {db} from '../config/Firebase'
import {collection, addDoc, doc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore'
import {  useHistory, useLocation } from "react-router-dom"
import { v4 as uuid } from 'uuid';

import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown'

function FreelancerForm() {
  const {currentUser} = useContext(AuthContext)
    const navigate = useHistory();
    const location = useLocation();


    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    
    const [newContact, setNewContact] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');

    const [newSummary, setNewSummary] = useState('');
    const [newHeadline, setNewHeadline] = useState('');
    const [newHourlyRate, setNewHourlyRate] = useState('');
    
    const [newCollege, setNewCollege] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newDegree, setNewDegree] = useState('');
    const [newStartYear, setNewStartYear] = useState('');
    const [newEndYear, setNewEndYear] = useState('');

    const [newTitle, setNewTitle] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [newJobSummary, setNewJobSummary] = useState('');
    const [newJobStartYear, setNewJobStartYear] = useState('');
    const [newJobEndYear, setNewJobEndYear] = useState('');
    const [newDepartments, setNewDepartments] = useState('');

    // const Departments = [
    //   { label: "Human Resources", value: "Human Resources" },
    //   { label: "Front End Development", value: "Front End Development" },
    //   { label: "Backend Development", value: "Backend Development" },
    //   { label: "Full Stack Development", value: "Full Stack Development" },
    //   { label: "Data Analyst", value: "Data Analyst"},
    //   { label: "Product Analyst", value: "Product Analyst" },
    // ];  


  //   const handleSelect = function(selectedItems) {
  //     const items = [];
  //     for (let i=0; i<selectedItems.length; i++) {
  //         items.push(selectedItems[i].value);
  //     }
  //     setNewDepartments(items);
  // }


    const createFreelancer = async () => {
      const userID = currentUser.uid;
        
        try{  
            await setDoc(doc(db, "freelancers", userID), {username : newName, mail : newEmail,
                     departments : newDepartments, user_id : userID,
                     personal : {contact_no : newContact, first_name : newFirstName, last_name : newLastName},
                     profile : {headline : newHeadline, hourly_rate : newHourlyRate, summary : newSummary},
                     education : {college : newCollege, country : newCountry, degree : newDegree, start_year : newStartYear, end_year : newEndYear},
                     experience : {company : newCompany, summary : newJobSummary, departments : newDepartments, 
                     title : newTitle, start_year : newJobStartYear, end_year : newJobEndYear}
                });

                await setDoc(doc(db, 'userChats', userID), {})

                const departmentRef = doc(db, 'departments', 'departments');
                await updateDoc(departmentRef, {
                  departments: arrayUnion(newDepartments)
                })


                navigate.push({
                pathname : `dashboard`,
                state : {status : true, email : newEmail}
            })
          } catch(err){
             console.log(err);
         }
        }


  return (
    <div className='w-40 m-5'>
    <h1 className='mb-3'>Freelancer SignUp Form :</h1>
    <Form>
    <Row >
    <Form.Group as={Col}>
        <Form.Label>User Name</Form.Label>
        <Form.Control placeholder="Enter User Name" className='w-50'
        onChange={(event) => {setNewName(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label className='ml-5'>Email</Form.Label>
        <Form.Control type="User Email" placeholder="Enter User Email" className='w-50'
        onChange={(event) => {setNewEmail(event.target.value)}}/>
      </Form.Group>
    </Row>
   

    <h4 className='mb-3 mt-4'>Personal Details : </h4>
    <Row className="mb-2">
    <Form.Group as={Col} className="mb-3">
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="John" 
      onChange={(event) => {setNewFirstName(event.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} className="mb-3">
      <Form.Label>Last Name</Form.Label>
      <Form.Control placeholder="Doe" 
      onChange={(event) => {setNewLastName(event.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} className="mb-3">
      <Form.Label>Contact Number</Form.Label>
      <Form.Control placeholder="Enter Contact Number" 
      onChange={(event) => {setNewContact(event.target.value)}}/>
    </Form.Group>
    </Row>

    <Row>
      <h4 className='mb-3 mt-2'>Profile : </h4>
      <Form.Group as={Col} className="mb-3" >
        <Form.Label>HeadLine</Form.Label>
        <Form.Control placeholder="Add a HeadLine" 
        onChange={(event) => {setNewHeadline(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" >
        <Form.Label>Hourly Rate : $</Form.Label>
        <Form.Control placeholder="Eg : $23" 
        onChange={(event) => {setNewHeadline(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Summary</Form.Label>
        <Form.Control placeholder="Create a Summary" as="textarea" rows="3"
        onChange={(event) => {setNewSummary(event.target.value)}}/>
      </Form.Group>
    </Row>


    <Row className="mb-3">
    <h4 className='mb-3 mt-2'>Education : </h4>
      <Form.Group as={Col}>
        <Form.Label>College</Form.Label>
        <Form.Control placeholder='College Name'
        onChange={(event) => {setNewCollege(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Country</Form.Label>
        <Form.Control placeholder='Country of Education'
        onChange={(event) => {setNewCountry(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Degree</Form.Label>
        <Form.Control placeholder="Enter Degree"
        onChange={(event) => {setNewDegree(event.target.value)}}/>
      </Form.Group>
      </Row>
    
    <Row>
      <Form.Group as={Col} >
        <Form.Label>Start Year</Form.Label>
        <Form.Control placeholder="Degree's Starting Year"
        onChange={(event) => {setNewStartYear(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>End Year</Form.Label>
        <Form.Control placeholder="Degree's Ending Year"
        onChange={(event) => {setNewEndYear(event.target.value)}}/>
      </Form.Group>
    </Row>

    <Row>
        <h4 className='mb-2 mt-5'>Experience : </h4>
        <Form.Group as={Col}>
        <Form.Label>Job Title</Form.Label>
        <Form.Control placeholder='Enter Job Title'
        onChange={(event) => {setNewTitle(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Company</Form.Label>
        <Form.Control placeholder='Enter Company Name'
        onChange={(event) => {setNewCompany(event.target.value)}}/>
      </Form.Group>
    
    {/* <Form.Label className='mb-2 mt-3'>Select Company Departments</Form.Label> 
    <Select options={ Departments } isMulti onChange={handleSelect}/> */}

      <Form.Group as={Col} >
        <Form.Label>Company Department</Form.Label>
        <Form.Control placeholder="Enter Company Department"
        onChange={(event) => {setNewDepartments(event.target.value)}}/>
      </Form.Group>
    </Row>

    {/* <Form.Group>
      <Form.Label>My multiselect</Form.Label>
      <Form.Control as="select" multiple value={newDepartments} onChange={e => setNewDepartments([].slice.call(e.target.selectedOptions).map(item => item.value))}>
        <option value="field1">Field 1</option>
        <option value="field2">Field 2</option>
        <option value="field3">Field 3</option>
      </Form.Control>
    </Form.Group> */}

          {/* <select multiple value={newDepartments} onChange={(e)=> {handleSelect(e.target.selectedOptions)}}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select> */}


    <Row className='mt-3'>

      <Form.Group as={Col} >
        <Form.Label>Job Summary</Form.Label>
        <Form.Control placeholder="Enter Job Summary" as="textarea" rows="3"
        onChange={(event) => {setNewJobSummary(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Start Year</Form.Label>
        <Form.Control placeholder="Job's Start Year"
        onChange={(event) => {setNewJobStartYear(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>End Year</Form.Label>
        <Form.Control placeholder="Job's End Year"
        onChange={(event) => {setNewJobEndYear(event.target.value)}}/>
      </Form.Group>
    </Row>


   

    <Button variant="primary" onClick={createFreelancer} className='mt-4'>
      Submit
    </Button>
  </Form>
  </div>
  )
}

export default FreelancerForm
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import React, {useState} from 'react'
import {db} from '../config/Firebase'
import {collection, addDoc, doc, setDoc} from 'firebase/firestore'
import {  useHistory, useLocation } from "react-router-dom"
import Select from 'react-select';
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

import { v4 as uuid } from 'uuid';


function CompanyForm() {
  const {currentUser} = useContext(AuthContext)
    const navigate = useHistory();

    const [newCompanyName, setNewCompanyName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [newName, setNewName] = useState('');
    const [newWebsite, setNewWebsite] = useState('');
    const [newWorkForce, setNewWorkForce] = useState('');
    const [newYears, setNewYears] = useState('');
    const [newDescription, setNewDescription] = useState('');
    
    const [newLocality, setNewLocality] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newPostal, setNewPostal] = useState('');
    const [newAddress, setNewAddress] = useState('');

    const [newDepartments, setNewDepartments] = useState([])

    const companyDepartments = [
      { label: "Human Resources", value: "Human Resources" },
      { label: "Front End Development", value: "Front End Development" },
      { label: "Backend Development", value: "Backend Development" },
      { label: "Full Stack Development", value: "Full Stack Development" },
      { label: "Data Analyst", value: "Data Analyst"},
      { label: "Product Analyst", value: "Product Analyst" },
    ];  

    const handleChange = (selectedItems) => {
      const items = [];
      for (let i=0; i<selectedItems.length; i++) {
          items.push(selectedItems[i].value);
      }
      setNewDepartments(items);
    }

    const createCompany = async () => {
        const userID = currentUser.uid;        
        try{  
            await setDoc(doc(db, 'company_users', userID),{company_name : newCompanyName, mail : newEmail, 
              departments : newDepartments, user_id : userID,
              profile : {description : newDescription, legal_name : newName, url : newWebsite,
                          work_force : newWorkForce, years : newYears, 
                          address : {country : newCountry, locality : newLocality, postal_code : newPostal, street_address : newAddress}},
          })

          await setDoc(doc(db, 'userChats', userID), {})
                     
              try{
                navigate.push({
                  pathname : `dashboard`,
                  state : {email : newEmail, status: false}
                })
              } catch(err) {
                  console.log(err, "navigation error")
              }
        } catch(err){
          console.log(err);
         }
        }

  return (
    <div className='w-40 m-5'>
    <h1 className='mb-3'>Company SignUp Form :</h1>
    <Form>
    <Row className="mb-3">
    <Form.Group as={Col}>
        <Form.Label>Company Name</Form.Label>
        <Form.Control placeholder="Company Name" className='w-50'
        onChange={(event) => {setNewCompanyName(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} className='ml-3'>
        <Form.Label className='ml-5'>Email</Form.Label>
        <Form.Control type="email" placeholder="Company Email" className='w-50'
        onChange={(event) => {setNewEmail(event.target.value)}}/>
      </Form.Group>
    </Row>

    <h4 className='mb-3 mt-5'>Profile : </h4>
    <Row className="mb-3">
    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
      <Form.Label>Legal Name</Form.Label>
      <Form.Control placeholder="XYZ Enterprise" 
      onChange={(event) => {setNewName(event.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
      <Form.Label>Company Website</Form.Label>
      <Form.Control placeholder="abc@mail.com" 
      onChange={(event) => {setNewWebsite(event.target.value)}}/>
    </Form.Group>

    <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
      <Form.Label>Company Work Force</Form.Label>
      <Form.Control placeholder="Enter Workforce (number)" 
      onChange={(event) => {setNewWorkForce(event.target.value)}}/>
    </Form.Group>
    </Row>

    <Row>
      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>Years of Establishment</Form.Label>
        <Form.Control placeholder="Number of Years" 
        onChange={(event) => {setNewWebsite(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
        <Form.Label>Company Description</Form.Label>
        <Form.Control placeholder="Company's Description" as="textarea" rows="3"
        onChange={(event) => {setNewDescription(event.target.value)}}/>
      </Form.Group>
    </Row>


    <Row className="mb-3">
      <Form.Group as={Col}>
        <Form.Label>Country</Form.Label>
        <Form.Control placeholder='Eg : India'
        onChange={(event) => {setNewCountry(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Locality</Form.Label>
        <Form.Control placeholder='Locality'
        onChange={(event) => {setNewLocality(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Postal Code</Form.Label>
        <Form.Control placeholder='Enter Postal Code'
        onChange={(event) => {setNewPostal(event.target.value)}}/>
      </Form.Group>

      <Form.Group as={Col} >
        <Form.Label>Street Address</Form.Label>
        <Form.Control placeholder='Enter Street Address'
        onChange={(event) => {setNewAddress(event.target.value)}}/>
      </Form.Group>
    </Row>

    <h4 className='mb-3 mt-5'>Company Departments : </h4>
    <Select options={ companyDepartments } isMulti onChange={handleChange}/>


    {/* <Form.Group className="mb-3" id="formGridCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}

    <Button variant="primary" onClick={createCompany} className='mt-3'>
      Submit
    </Button>
  </Form>
  </div>
  )
}

export default CompanyForm
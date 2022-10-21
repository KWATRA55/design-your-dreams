import React, {useEffect, useState} from 'react'
import {db} from '../config/Firebase'
import {collection, addDoc, doc, setDoc, set} from 'firebase/firestore'
import { useHistory, useLocation } from "react-router-dom"

// const companyCollectionRef = collection(db, 'company_users')



function CompanyForm() {
    const navigate = useHistory();
    const location = useLocation();

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

    const [newDept1, setNewDept1] = useState('');
    const [newDept2, setNewDept2] = useState('');
    const [newDept3, setNewDept3] = useState('');
    const [newDept4, setNewDept4] = useState('');


    const createCompany = async () => {
        try{
            // await addDoc(collection(db, 'company_users', newEmail),{company_name : newCompanyName, mail : newEmail, 
            //        profile : {description : newDescription, legal_name : newName, url : newWebsite,
            //                    work_force : newWorkForce, years : newYears, 
            //                    address : {country : newCountry, locality : newLocality, postal_code : newPostal, street_address : newAddress}},
            //        departments : [newDept1, newDept2, newDept3, newDept4]
            //    })

            await setDoc(doc(db, 'company_users', newEmail),{company_name : newCompanyName, mail : newEmail, 
                   profile : {description : newDescription, legal_name : newName, url : newWebsite,
                               work_force : newWorkForce, years : newYears, 
                               address : {country : newCountry, locality : newLocality, postal_code : newPostal, street_address : newAddress}},
                   departments : [newDept1, newDept2, newDept3, newDept4]
               })

            //const ref = doc(db, 'company_users', location.state.email);
            // setDoc(doc(db,'company_users', newEmail), {company_name : newCompanyName, mail : newEmail, 
            //     profile : {description : newDescription, legal_name : newName, url : newWebsite,
            //                 work_force : newWorkForce, years : newYears, 
            //                 address : {country : newCountry, locality : newLocality, postal_code : newPostal, street_address : newAddress}},
            //     departments : [newDept1, newDept2, newDept3, newDept4]
            // })
            try{
                navigate.push({
                  pathname : `companydashboard`,
                  state : {email: newEmail}
                })
            } catch(err) {
                console.log(err, "navigation error")
            }

        } catch(err){
             console.log(err);
         }
        // document.getElementById('company_name').value = ""
        // document.getElementById('mail').value = ""

        // document.getElementById('legal_name').value = ""
        // document.getElementById('url').value = ""
        // document.getElementById('work_force').value = ""
        // document.getElementById('years').value = ""
        // document.getElementById('description').value = ""

        // document.getElementById('country').value = ""
        // document.getElementById('locality').value = ""
        // document.getElementById('postal_code').value = ""
        // document.getElementById('street_address').value = ""

        // document.getElementById('dept_1').value = ""
        // document.getElementById('dept_2').value = ""
        // document.getElementById('dept_3').value = ""
        // document.getElementById('dept_4').value = ""


        // await addDoc(companyCollectionRef, {company_name : newCompanyName, mail : newEmail, 
        //     profile : {description : newDescription, legal_name : newName, url : newWebsite,
        //                 work_force : newWorkForce, years : newYears, 
        //                 address : {country : newCountry, locality : newLocality, postal_code : newPostal, street_address : newAddress}},
        //     departments : [newDept1, newDept2, newDept3, newDept4]
        // })
    }


  return (
    <div>
        <h1 className='mb-5'>Company SignUp Form :</h1>
      <input placeholder="Company Name" id = 'company_name'
        onChange={(event) => {setNewCompanyName(event.target.value)}}/>
      <input placeholder="Company Email" id = 'mail' 
        onChange={(event) => {setNewEmail(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Profile : </h3>
      <input placeholder="Legal Name" id = 'legal_name'
        onChange={(event) => {setNewName(event.target.value)}}/>
      <input placeholder="Company Website" id = 'url'
        onChange={(event) => {setNewWebsite(event.target.value)}}/><br />
      <input placeholder="Company's Work Force" id = 'work_force'
        onChange={(event) => {setNewWorkForce(event.target.value)}}/>
      <input placeholder="Years of Establishment" id = 'years'
        onChange={(event) => {setNewYears(event.target.value)}}/> <br />    
      <textarea rows='3' cols='50' placeholder="Company's Description" id = 'description'
        onChange={(event) => {setNewDescription(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Address : </h3>
      <input placeholder="Country" id = 'country'
        onChange={(event) => {setNewCountry(event.target.value)}}/>
      <input placeholder="Locality" id = 'locality'
        onChange={(event) => {setNewLocality(event.target.value)}}/><br/>
      <input placeholder="Postal Code" id = 'postal_code'
        onChange={(event) => {setNewPostal(event.target.value)}}/>
      <input placeholder="Street Address" id = 'street_address'
        onChange={(event) => {setNewAddress(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Departments : </h3>
      <input placeholder="Department 1" id = 'dept_1'
        onChange={(event) => {setNewDept1(event.target.value)}}/>
      <input placeholder="Department 2" id = 'dept_2'
        onChange={(event) => {setNewDept2(event.target.value)}}/><br/>
      <input placeholder="Department 3" id = 'dept_3'
        onChange={(event) => {setNewDept3(event.target.value)}}/>
      <input placeholder="Department 4" id = 'dept_4'
        onChange={(event) => {setNewDept4(event.target.value)}}/>


      <br /><br /><button onClick={createCompany}>
        Finish SignUp
      </button>
      
    </div>
  )
}

export default CompanyForm
import React, {useState} from 'react'
import {db} from '../config/Firebase'
import {collection, addDoc, doc, setDoc} from 'firebase/firestore'
import {  useHistory, useLocation } from "react-router-dom"

//const freelancerCollectionRef = collection(db, 'freelancers')

function FreelancerForm() {
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


    const createFreelancer = async () => {
        
        try{  
            //await addDoc(collection(db, 'freelancers', newEmail), {username : newName, mail : newEmail})
            //const ref = doc(db, 'freelancers', newEmail);
          //   await setDoc(doc(db,'freelancers', newEmail), {username : newName, mail : newEmail, 
          //       personal : {contact_no : newContact, first_name : newFirstName, last_name : newLastName},
          //       profile : {headline : newHeadline, hourly_rate : newHourlyRate, summary : newSummary},
          //       education : {college : newCollege, country : newCountry, degree : newDegree, start_year : newStartYear, end_year : newEndYear},
          //       experience : {company : newCompany, summary : newJobSummary, title : newTitle, start_year : newJobStartYear, end_year : newJobEndYear}
          //  })
            //const ref = doc(db, "freelancers", newEmail);
            await setDoc(doc(db, "freelancers", newEmail), {username : newName, mail : newEmail, 
                     personal : {contact_no : newContact, first_name : newFirstName, last_name : newLastName},
                     profile : {headline : newHeadline, hourly_rate : newHourlyRate, summary : newSummary},
                     education : {college : newCollege, country : newCountry, degree : newDegree, start_year : newStartYear, end_year : newEndYear},
                     experience : {company : newCompany, summary : newJobSummary, title : newTitle, start_year : newJobStartYear, end_year : newJobEndYear}
                });

                navigate.push({
                pathname : `freelancerdashboard`,
                state : {email: newEmail}
            })
          } catch(err){
             console.log(err);
         }

        // document.getElementById('username').value = ""
        // document.getElementById('mail').value = ""

        // document.getElementById('first_name').value = ""
        // document.getElementById('last_name').value = ""
        // document.getElementById('contact_no').value = ""

        // document.getElementById('headline').value = ""
        // document.getElementById('hourly_rate').value = ""
        // document.getElementById('summary').value = ""

        // document.getElementById('college').value = ""
        // document.getElementById('country').value = ""
        // document.getElementById('degree').value = ""
        // document.getElementById('start_year').value = ""
        // document.getElementById('end_year').value = ""

        // document.getElementById('title').value = ""
        // document.getElementById('company').value = ""
        // document.getElementById('job_summary').value = ""
        // document.getElementById('job_start_year').value = ""
        // document.getElementById('job_end_year').value = ""


    }
    
  return (
    <div>
        <h1 className='mb-5'>Freelancer Form :</h1>
      <input placeholder="User Name" id = 'username'
        onChange={(event) => {setNewName(event.target.value)}}/>
      <input placeholder="Email" id = 'mail'
        onChange={(event) => {setNewEmail(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Personal Details : </h3>
      <input placeholder="First Name" id = 'first_name'
        onChange={(event) => {setNewFirstName(event.target.value)}}/>
      <input placeholder="Last Name" id = 'last_name'
        onChange={(event) => {setNewLastName(event.target.value)}}/>
      <input placeholder="Contact Number" id = 'contact_no'
        onChange={(event) => {setNewContact(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Profile : </h3>
      <input placeholder="HeadLine" id = 'headline'
        onChange={(event) => {setNewHeadline(event.target.value)}}/>
      <input placeholder="Hourly Rate : $" id = 'hourly_rate'
        onChange={(event) => {setNewHourlyRate(event.target.value)}}/><br/>
      <textarea rows='3' cols='50' placeholder="Summary" id = 'summary'
        onChange={(event) => {setNewSummary(event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Education : </h3>
      <input placeholder="College" id = 'college'
        onChange={(event) => {setNewCollege(event.target.value)}}/>
      <input placeholder="Country" id = 'country'
        onChange={(event) => {setNewCountry(event.target.value)}}/><br/>
      <input placeholder="Degree" id = 'degree'
        onChange={(event) => {setNewDegree(event.target.value)}}/>
      <input placeholder="Start Year" id = 'start_year'
        onChange={(event) => {setNewStartYear(event.target.value)}}/>
      <input placeholder="End Year" id = 'end_year'
        onChange={(event) => {setNewEndYear (event.target.value)}}/>


      <h3 className='mb-3 mt-3'>Experience : </h3>
      <input placeholder="Job Title" id = 'title'
        onChange={(event) => {setNewTitle(event.target.value)}}/>
      <input placeholder="Company" id = 'company'
        onChange={(event) => {setNewCompany(event.target.value)}}/><br/>
      <textarea rows='3' cols='50' placeholder="Job Summary" id = 'job_summary'
        onChange={(event) => {setNewJobSummary(event.target.value)}}/><br />
      <input placeholder="Start Year" id = 'job_start_year'
        onChange={(event) => {setNewJobStartYear(event.target.value)}}/>
      <input placeholder="End Year" id = 'job_end_year'
        onChange={(event) => {setNewJobEndYear (event.target.value)}}/>


      <br /><br /><button onClick={createFreelancer}>
        Create Freelancer
      </button>

        
      
    </div>
  )
}

export default FreelancerForm
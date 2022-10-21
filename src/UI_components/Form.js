import { useHistory, useLocation } from "react-router-dom"
import React, {useState} from 'react'
import {db} from '../config/Firebase'
import Test from "./Test";


import FreelancerForm from "./FreelancerForm";
import CompanyForm from "./CompanyForm";


function FormPage() {
    const location = useLocation()

  return (
    <div>
        {location.state.status ? <FreelancerForm /> : <CompanyForm />}
    </div>
  )
}

export default FormPage

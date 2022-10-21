import React from 'react'
import { useHistory, useLocation } from "react-router-dom"


function LoginAs() {

    const navigate = useHistory();
    const location = useLocation();

    const company = () => {
      navigate.push({
        pathname : `companyform`,
        state : {email: location.state.email}
      })    
    }

    
    const freelancer = () => {
      navigate.push({
        pathname : `freelancerform`,
        state : {email: location.state.email}
      })    
    }

  return (
    <div>
        <button onClick={company}>I'm a company</button>
        <button onClick={freelancer}>I'm a freelancer</button>
    </div>
  )
}

export default LoginAs
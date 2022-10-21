import React from 'react'
import { useHistory, useLocation } from "react-router-dom"

import FreelancerDashboard from './FreelancerDashboard'
import CompanyDashboard from './CompanyDashboard'

function Dashboard() {
    const location = useLocation()

    const mail = location.state.email
  return (
    <div>
        {location.state.status ? <FreelancerDashboard email = {mail}/> : <CompanyDashboard email = {mail}/>}
    </div>
  )
}

export default Dashboard
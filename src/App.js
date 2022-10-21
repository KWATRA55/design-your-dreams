//router
import IndexRouters from "./router/index"

import { Switch,Route } from 'react-router-dom'
// import FreelancerDashboard from './logic_components/FreelancerDashboard';
// import CompanyDashboard from './logic_components/CompanyDashboard';
import LoginPage from './UI_components/sign-in'
import SignUpPage from './UI_components/sign-up'
import Form from "./UI_components/Form";
// import CompanyDashboard from "./UI_components/CompanyDashboard";
// import FreelancerDashboard from "./UI_components/FreelancerDashboard";
import Dashboard from "./UI_components/Dashboard";
import TestChat from "./UI_components/TestChat";
import {useHistory} from 'react-router-dom'

// {/* <IndexRouters /> */}
//scss
import "./assets/scss/socialv.scss"

import Test from "./UI_components/Test";
import Chat from "./UI_components/Chat";
import { useContext } from "react";
import { AuthContext } from "./UI_components/context/AuthContext";
import Login from "./logic_components/Login";

function App() {

  const {currentUser} = useContext(AuthContext)

  console.log(currentUser)

  const ProtectedRoute = ({children}) => {
    const navigate = useHistory()
    if(!currentUser){
          navigate.push({
          pathname : `loginpage`
        })
    }
    return children

  }

  return (
    <div className="App">
      <Switch>
        <Route path='/chat' component={Test} />

        <Route index path='/loginpage' component={LoginPage}/>
  
        <Route path='/signup' component={SignUpPage} />

        <Route path='/form' render={() => <ProtectedRoute><Form /></ProtectedRoute>} />

        <Route path='/dashboard' render={() => <ProtectedRoute><Dashboard /></ProtectedRoute>}/>

        {/* <Route path='/chat' component={Chat} /> */}

        {/* <Route path='/freelancerform' component={FreelancerForm} />
        <Route path='/companyform' component={CompanyForm} /> */}
        {/* <Route path='/register' component={Register} /> */}

        {/* <Route path='/loginas' component={LoginAs} /> */}

        {/* <Route path='/freelancerdashboard' component={FreelancerDashboard }  />
        <Route path='/companydashboard' component={CompanyDashboard} /> */}
    </Switch>
   
    </div>
  );
}

export default App;

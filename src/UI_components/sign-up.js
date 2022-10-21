import {Row,Col,Container,Form,Button,Image,ButtonToolbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import React, {useEffect, useState} from 'react'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../config/firebase-config'
import { useHistory } from "react-router-dom"

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/components/navigation/navigation.scss';

//img
import logo from '../assets/images/logo-full.png'
import login1 from '../assets/images/login/1.png'
import login2 from '../assets/images/login/2.png'
import login3 from '../assets/images/login/3.png'

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
   let history =useHistory()

   const [registerEmail, setRegisterEmail] = useState('');
   const [registerPassword, setRegisterPassword] = useState('');
   const [displayName, setDisplayName] = useState('');

   const registerAsFreelancer = async () => {
      try{
        const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        await updateProfile(res.user, {
         displayName
         });

        history.push({
         pathname : `form`,
         state : {email: registerEmail,
               status : true}
       }) 
      } catch (error) {
          console.log(error.message)
      }
    }

    const registerAsCompany = async () => {
      try{
        const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
         await updateProfile(res.user, {
         displayName
         });

         history.push({
         pathname : `form`,
         state : {email: registerEmail,
               status : false}
       })
      } catch (error) {
          console.log(error.message)
      }
    }

    useEffect(() => {

    }, [])

   return (
      <>
         <section className="sign-in-page">
            <div id="container-inside">
                  <div id="circle-small"></div>
                  <div id="circle-medium"></div>
                  <div id="circle-large"></div>
                  <div id="circle-xlarge"></div>
                  <div id="circle-xxlarge"></div>
            </div>
            <Container className="p-0">
               <Row className="no-gutters">
                  <Col md="6" className="text-center pt-5">
                     <div className="sign-in-detail text-white">
                           <Link className="sign-in-logo mb-5" to="#"><Image src={logo} className="img-fluid" alt="logo"/></Link>
                           <div className="sign-slider overflow-hidden">
                              <Swiper 
                                 spaceBetween={30} 
                                 centeredSlides={true} 
                                 autoplay={{
                                    "delay": 2000,
                                    "disableOnInteraction": false }}    
                                 className="list-inline m-0 p-0 ">
                                 <SwiperSlide>
                                    <Image src={login1} className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Find new friends</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <Image src={login2} className="img-fluid mb-4" alt="logo"/> 
                                    <h4 className="mb-1 text-white">Connect with the world</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <Image src={login3} className="img-fluid mb-4" alt="logo"/>
                                    <h4 className="mb-1 text-white">Create new events</h4>
                                    <p>It is a long established fact that a reader will be distracted by the readable content.</p>
                                 </SwiperSlide>
                              </Swiper>
                           </div>
                     </div>
                  </Col>
                  <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
                     <div className="sign-in-from">
                        <h1 className="mb-0">Sign Up</h1>
                        <p>Enter your email address and password to access admin panel.</p>
                        <Form className="mt-4">
                           <Form.Group className="form-group">
                              <Form.Label>Your Display Name</Form.Label>
                              <Form.Control type="email" className="mb-0" id="exampleInputEmail1" placeholder="Your Display Name"
                              onChange={(event) => {
                                 setDisplayName(event.target.value)
                               }}/>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control type="email" className="mb-0" id="exampleInputEmail2" placeholder="Enter email"
                               onChange={(event) => {
                                 setRegisterEmail(event.target.value)
                               }}/>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="password" className="mb-0" id="exampleInputPassword1" placeholder="Password"
                               onChange={(event) => {
                                 setRegisterPassword(event.target.value)
                               }}/>
                           </Form.Group>
                           <div className="d-inline-block w-100">
                              {/* <Form.Check className="mt-2 pt-1 d-flex justify-content-between">
                                    <Form.Check.Input type="checkbox" className="me-2" id="customCheck1"/>
                                    <Form.Check.Label>I accept <Link to="#">Terms and Conditions</Link></Form.Check.Label>
                              </Form.Check> */}
                              
                              <Form.Group className='form-group'>
                              <Form.Label>Sign Up</Form.Label>
                              <ButtonToolbar className='d-flex justify-content-between'>
                                 <Button variant="primary" type="button"  className="d-flex"
                                 onClick={registerAsFreelancer}>As Freelancer</Button>
                                 <Button variant="info" type="button"  className="d-flex" 
                                 onClick={registerAsCompany}>As Company</Button>
                              </ButtonToolbar>
                           </Form.Group>
                           </div>

                           <div className="d-inline-block w-100"> 
                              Already Have Account ? 
                              <Link to="/loginpage">Log In</Link>
                              <div className='d-flex ml-3'>
                              <ul className="iq-social-media">
                                 <li><Link to="#"><i className="ri-facebook-box-line"></i></Link></li>
                                 <li><Link to="#"><i className="ri-twitter-line"></i></Link></li>
                                 <li><Link to="#"><i className="ri-instagram-line"></i></Link></li>
                              </ul>
                              </div>
                           </div>

                        </Form>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>  
      </>
   )
}

export default SignUp

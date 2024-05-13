/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css';
//import drona_view from './Images/drona_view.jpg';
import Library_kns from './Images/Library_kns.jpg';
//import Weston_Band from './Images/Weston_Band.jpg';
import { Container } from 'react-bootstrap';




//import Axios from 'axios';
import { useState } from 'react';
//import { Router } from 'express';
//import { response } from 'express';

function Login() {

  const [UserName,setUserName]=useState("");
  const [Password,setPassword]=useState("");

  function FormHandler(event){
    event.preventDefault();

    let LoginData={
          UserName:UserName,
          Password:Password
    }
    console.log("clicked");

    fetch("http://localhost:3000/login",{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(LoginData)
    }).then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
     }
      return response.json(); // Parse JSON from the response

          }).then(data => {
                                   // Handle the response data
        //alert(JSON.stringify(data));
        if ((data.message==="you can log in to the system")) {
    // Redirect the user to another page
          //console.log("condition is true");
           //window.location.href = "/DashBoard"; // Change '/dashboard' to the URL of the dashboard page
           // Inside your fetch .then() block
            
window.location.href = `/DashBoard?username=${UserName}`;

  }else{
    alert(JSON.stringify(data.message)); 
  };
        })
          .catch(error => {
            // Display alert with the response data
          console.error('There was a problem with the fetch operation:', error);
          });
    }

  return (
    <div className="Login">

<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><b>The Library Management Syatem,<br/> R/Kalawana National School</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
      </ul>
      
        
        <button class="btn btn-outline-success text-bg-Info" onClick={() => {window.location.href = "/Signup"}}>
        Sign Up
        </button>
    </div>
  </div>
</nav>

        <section className="vh-90 pt-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 mb-3" >
              <img src={Library_kns} className="img-fluid" alt="Phone" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={FormHandler}>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">Username</label>
                  <input type="username" id="form1Example13" className="form-control form-control-lg" placeholder='Enter your Username' onChange={e=>{setUserName(e.target.value)}}/>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                  <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='Enter your Password' onChange={e=>{setPassword(e.target.value)}}/>
               </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                <Container className="d-flex justify-content-center align-items-center mt-4 mb-3">
                <div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Log in</button>
                </div>
                </Container>


              </form>
            </div>
          </div>
        </div>
      </section>
        </div>
  );
}


export default Login;
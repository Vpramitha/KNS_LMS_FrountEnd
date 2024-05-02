import 'bootstrap/dist/css/bootstrap.min.css';

import Library_kns from './Images/Library_kns.jpg';

import { Container } from 'react-bootstrap';
import {useState} from 'react';

function Signup() {
const [sid,setSid]=useState("");
const [name,setName]=useState("");

function FormHandler(event){
    event.preventDefault();

    let RegisterData={
          sid:sid,
          name:name
    }
    console.log("clicked");

    fetch("http://localhost:3000/RegisterSystem",{
      method:'post',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(RegisterData)
    }).then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
     }
      return response.json(); // Parse JSON from the response

          }).then(data => {
                                   // Handle the response data
        alert(JSON.stringify(data.message));

        })
          .catch(error => {
            // Display alert with the response data
          console.error('There was a problem with the fetch operation:', error);
          });
    }

  return (
    <div className="SignUp">

    <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="?"><b>The Library Management Syatem,<br/> R/Kalawana National School</b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="?">Home</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        
        <button class="btn btn-outline-success text-bg-Info" type="submit">Sign Up</button>
      </form>
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
                  <label className="form-label" htmlFor="form1Example13">Student ID</label>
                  <input type="username" id="form1Example13" className="form-control form-control-lg" placeholder='Enter your Student ID' onChange={e=>{setSid(e.target.value)}}/>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">Student Name</label>
                  <input type="username" id="form1Example13" className="form-control form-control-lg" placeholder='Enter your Name' onChange={e=>{setName(e.target.value)}} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">Mobile Number</label>
                  <input type="username" id="form1Example13" className="form-control form-control-lg" placeholder='Enter your Mobile Number'/>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">Personal Address</label>
                  <input type="username" id="form1Example13" className="form-control form-control-lg" placeholder='Enter your Personal Address'/>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                  <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='Enter your Password'/>
               </div>

               <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">Re-Enter Password Again</label>
                  <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='Re-Enter your Password'/>
               </div>


                <Container className="d-flex justify-content-center align-items-center mt-4 mb-3">
    <div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
    </div>
    <div style={{ marginLeft: '10px' }}>
        <button type="Clear" className="btn btn-primary btn-lg btn-block">Clear</button>
    </div>
</Container>




              </form>
            </div>
          </div>
        </div>
      </section>


    </div>)}

    export default Signup;
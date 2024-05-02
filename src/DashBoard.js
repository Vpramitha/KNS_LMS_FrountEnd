import 'bootstrap/dist/css/bootstrap.min.css';
//import drona_view from './Images/drona_view.jpg';
import catalog_view from './Images/catalog.png';
import OnlineLibrary_view from './Images/OnlineLibrary.png';
import Profile_view from './Images/Profile.png';
import Report_view from './Images/Report.png';
import User_view from './Images/User.png';
import Employee_view from './Images/Employee.png';

import { useLocation } from 'react-router-dom';


/*
import { Html5QrcodeScanner } from 'html5-qrcode';
import {useEffect, useState} from 'react';
*/
import Dropdown from 'react-bootstrap/Dropdown';

function DashBoard(){
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  //////////////////////////////////////////////////////
/*

  
  const [scanResult,setScanResult]=useState(null);

  useEffect(()=>{

    
  const scanner = new Html5QrcodeScanner('reader',{
    qrbox:{
      width:350,
      height:350,
    },
    fps: 5,
  });

  scanner.render(success,error);

  function success(result){
      scanner.clear();
      setScanResult(result);
  }

  function error(err){
      console.warn(err);
  }


  },[]);*/

  ///////////////////////////////////////////////////
    return(
        <div className='DashBoard'>
        <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary absolute">
  <div class="container-fluid">
    <a class="navbar-brand" href="?"><b>The Library Management Syatem,<br/> R/Kalawana National School </b></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" >
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="?">Home</a>
        </li>
        

        <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{width:'10%'}}>
        <img src={Profile_view}  style={{ width: '50%', height: '50%' }} alt=''/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
      <img src={Profile_view}  style={{ width: '10%', height: '10%'}} alt=''/>
        <Dropdown.Item >{username}</Dropdown.Item>
        <Dropdown.Item >Position</Dropdown.Item>
        <Dropdown.Item >Contact</Dropdown.Item>
        <Dropdown.Item >Address</Dropdown.Item>
        <button>Edit</button>
      </Dropdown.Menu>
    </Dropdown>


      </ul>


      
        <button class="btn btn-outline-danger text-bg-dark-subtle " onClick={()=>{window.location.href="/"} }>Sign Out</button>
      
    </div>
  </div>
</nav>
</div>


<div class="px-3">
<div class="card-group">
<div class="card mt-2" onClick={() => { window.location.href = "/Catalog"; }}>
  <div class="card-body">
    <h5 class="card-title text-center">Catalog</h5>
    <img src={catalog_view} class="mb-2" style={{ width: '100%', height: 'auto' }} alt=''/>
    <h6 class="card-subtitle mb-2 text-body-secondary text-center">Card subtitle</h6>
  </div>
</div>

<div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title text-center">Online Library</h5>
    <img src={OnlineLibrary_view} class="mb-2" style={{ width: '100%', height: 'auto' }} alt=''/>
    <h6 class="card-subtitle mb-2 text-body-secondary text-center">Card subtitle</h6>

  </div>
</div>

<div class="card mt-2" onClick={() => { window.location.href = "/User";}}>
  <div class="card-body">
    <h5 class="card-title text-center">Users</h5>
    <img src={User_view} class="mb-2" style={{ width: '100%', height: 'auto' }} alt=''/>
    <h6 class="card-subtitle mb-2 text-body-secondary text-center">Card subtitle</h6>
    
  </div>
</div>

<div class="card mt-2" onClick={() => { window.location.href = "/Employee";}}>
  <div class="card-body">
    <h5 class="card-title text-center">Employee</h5>
    <img src={Employee_view} class="mb-2" style={{ width: '100%', height: 'auto' }} alt=''/>
    <h6 class="card-subtitle mb-2 text-body-secondary text-center">Card subtitle</h6>
    
  </div>
</div>

<div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title text-center">Reports</h5>
    <img src={Report_view} class="mb-2" style={{ width: '100%', height: 'auto' }} alt=''/>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    
  </div>
</div>




</div>



{/*

<div>
  {scanResult
      ?<div>Success: {scanResult}</div>
      :<div id="reader" style={{width:500,height:500}}></div>
      }
</div>

*/}




        </div>
        </div>

    );
}

export default DashBoard;
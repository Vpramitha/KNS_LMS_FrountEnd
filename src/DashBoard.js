import 'bootstrap/dist/css/bootstrap.min.css';
//import drona_view from './Images/drona_view.jpg';
import catalog_view from './Images/catalog.png';
import OnlineLibrary_view from './Images/OnlineLibrary.png';
import Report_view from './Images/Report.png';
import User_view from './Images/User.png';
import Employee_view from './Images/Employee.png';

import NavigationBar from './NavBar.js';

//import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


//import QrReader from 'react-qr-reader';



import { Html5QrcodeScanner } from 'html5-qrcode';
//import {useEffect, useState} from 'react';



function DashBoard(){
  //const location = useLocation();
  //const [username, setUsername] = useState('');

  //////////////////////////////////////////////////////


  
  const [scanResult,setScanResult]=useState(null);

  ///////////////////////////////////////////////////
  // State variables to hold user_id and user_name

  useEffect(() => {
    
      // Define a variable to store the active camera stream
let activeCameraStream;

// Initialize the scanner with options
const scanner = new Html5QrcodeScanner('reader',{
    qrbox: {
        width: 350,
        height: 350,
    },
    fps: 5,
});

// Render the scanner
scanner.render(success, error);

// Success callback function
function success(result) {
    // Clear the scanner
    scanner.clear();
    // Set the scan result
    setScanResult(result);
    // Stop the active camera stream
    startScanning();

}

// Error callback function
function error(err) {
    console.warn(err);
}

// Function to stop the active camera stream
function stopActiveCameraStream() {
    if (activeCameraStream) {
        // Stop the active camera stream
        activeCameraStream.getTracks().forEach(track => track.stop());
        // Set activeCameraStream to null
        activeCameraStream = null;
    }
}

// Function to start scanning
function startScanning() {
    // Stop the active camera stream if exists
    stopActiveCameraStream();
    // Start scanning
    scanner.start();
}

// Function to stop scanning
function stopScanning() {
    // Stop scanning
    scanner.stop();
}


    /////////////////////////


  }, []);
    return(
        <div className='DashBoard'>

        <NavigationBar showSearch={false}/>

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
<div class="card-group">

<div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title text-center">Email</h5>
    
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    
  </div>
</div>

<div class="card mt-2 center" >
  <div class="card-body">

  <div>
  {scanResult
      ?<div>Success: {scanResult}</div>
      :<div id="reader" style={{width:500,height:500}}></div>
      }
</div>

<div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title text-center">Email</h5>
    
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    
  </div>
</div>
    
    
  </div>
</div>


<div class="card mt-2" >
  <div class="card-body">
    <h5 class="card-title text-center">Notice</h5>
    
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
import React, { useEffect, useState } from 'react';


//import QrReader from 'react-qr-reader';



import { Html5QrcodeScanner } from 'html5-qrcode';
import { Modal, Button } from 'react-bootstrap';


const QRModal = (showQRModal,setShowQRModal) => {
    
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
  

  return (
    <Modal show={showQRModal} onHide={() => setShowQRModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>QR Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      <div>
  {scanResult
      ?<div>Success: {scanResult}</div>
      :<div id="reader" style={{width:500,height:500}}></div>
      }
</div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowQRModal(false)}>
          Close
        </Button>
        <Button variant="primary" >
          Issue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRModal;

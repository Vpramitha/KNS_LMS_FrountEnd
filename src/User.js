import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';


import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import NavigationBar from './NavBar.js';

//import QRCode from 'qrcode.react';

//import QRCodePrinter from './QRPrinter';

//import {Row, Col } from 'react-bootstrap';

import addBook_view from './Images/AddNewbook.png';

function Catalog() {
  const [data, setData] = useState([]);
const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  //const [showQRModal, setShowQRModal] = useState(false);
//const [qrData, setQRData] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/LoadMembers');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  /*const generateQRCode = (record) => {
  const data = JSON.stringify(record); // Convert record to JSON string
  setQRData(data); // Set QR code data
  setShowQRModal(true); // Show the modal
};*/

  return (
    ///////////////////////////////////////
   <div className='Catalog'>
   <NavigationBar showSearch={true}/>
    <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Age</th>
          </tr>
        </thead>
         <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleRecordClick(item)}>
              <td>{item.Name}</td>
              <td>{item.Passwprd}</td>
              <td>{item.Age}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>

 <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
    <Form.Group controlId="formTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Name : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Title: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formAuthor">
      <Form.Label>Author</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Passwprd : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Author: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Age : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Price: e.target.value })} />
    </Form.Group>
  </Form>
</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            // Handle update action here
            console.log("Update record:", selectedRecord);
            handleCloseModal();
          }}>
            Save Changes
          </Button>
         

        </Modal.Footer>
      </Modal>





      </div>

      <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
            <img src={addBook_view} alt="" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={()=>{window.location.href="/AddNewBook"} }/>
      </div>

      
    </div>
  );
}

export default Catalog;

import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import QRCode from 'qrcode.react';

//import QRCodePrinter from './QRPrinter';

//import {Row, Col } from 'react-bootstrap';

import addBook_view from './Images/AddNewbook.png';

function Catalog() {
  const [data, setData] = useState([]);
const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showQRModal, setShowQRModal] = useState(false);
const [qrData, setQRData] = useState('');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/LoadCatalog');
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

  const generateQRCode = (record) => {
  const data = JSON.stringify(record); // Convert record to JSON string
  setQRData(data); // Set QR code data
  setShowQRModal(true); // Show the modal
};

  return (
    ///////////////////////////////////////
   <div className='Catalog'>
   
      
    <Navbar expand="lg" className="bg-body-tertiary fixed">
      <Container fluid>
        <Navbar.Brand href="#"><b>The Library Management Syatem,<br/> R/Kalawana National School</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/DashBoard">DashBoard</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
            <Button variant="btn btn-outline-danger text-bg-dark-subtle">Sign Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
          </tr>
        </thead>
         <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => handleRecordClick(item)}>
              <td>{item.Title}</td>
              <td>{item.Author}</td>
              <td>{item.Price}</td>
              
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
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Title : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Title: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formAuthor">
      <Form.Label>Author</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Author : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Author: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Price : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Price: e.target.value })} />
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

          <Button onClick={() => generateQRCode(selectedRecord)}>Generate QR</Button>
          

        </Modal.Footer>
      </Modal>

<Modal show={showQRModal} onHide={() => setShowQRModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>QR Code</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <QRCode value={qrData} />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowQRModal(false)}>
      Close
    </Button>
    <Button variant="primary" >
        Print QR Code
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

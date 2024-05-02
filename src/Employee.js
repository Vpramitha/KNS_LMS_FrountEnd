import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Table from 'react-bootstrap/Table';

//import {Row, Col } from 'react-bootstrap';

import addBook_view from './Images/AddNewbook.png';

function Employee() {
  const [data, setData] = useState({ results: [] });

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/loadCatalog'); // Assuming your backend endpoint is '/loadCatalog'
      setData(response.data); // Set the fetched data into state
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Age</th>
          </tr>
        </thead>
       
       <tbody>
          {data.results.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.Passwprd}</td>
              <td>{item.Age}</td>
            </tr>
          ))}
        </tbody>

      </Table>

      <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
            <img src={addBook_view} alt="" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={()=>{window.location.href="/AddNewBook"} }/>
      </div>

      
    </div>
  );
}

export default Employee;

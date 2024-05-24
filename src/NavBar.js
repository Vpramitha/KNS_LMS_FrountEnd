import React, { useState,useEffect } from 'react';
import { Button, Container, Dropdown, Form, Nav, Navbar } from 'react-bootstrap';
import ProfileView from './Images/Profile.png';

function NavigationBar({ showSearch, handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Call the handleSearch function passed from Catalog.js
  };

  const [userId, setUserId] = useState('');

    useEffect(() => {
        // Function to get the value of the 'user_id' cookie
        const getUserIdFromCookie = () => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('user_id=')) {
                    return cookie.substring('user_id='.length, cookie.length);
                }
            }
            return '';
        };

        const id = getUserIdFromCookie();
        setUserId(id);
    }, []);

    const handleAlert = () => {
        alert('User ID: ' + userId);
    };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><b>The Library Management System,<br /> R/Kalawana National School </b></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/DashBoard">Dashboard</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-basic" style={{ width: '10%' }}>
                <img src={ProfileView} style={{ width: '50%', height: '50%' }} alt='' />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <img src={ProfileView} style={{ width: '10%', height: '10%' }} alt='' />
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item>Contact</Dropdown.Item>
                <Dropdown.Item>Address</Dropdown.Item>
                <button>Edit</button>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          {/* Conditionally render the search form and button based on the 'showSearch' prop */}
          {showSearch && (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleChange}
              />
              <Button variant="outline-success">Help</Button>
            </Form>
          )}
          <Button variant="outline-danger mx-2" style={{ whiteSpace: 'nowrap' }} onClick={handleAlert}>Log Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

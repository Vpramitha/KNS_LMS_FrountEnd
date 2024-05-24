import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddNewAdminModule = ({ showAddNewAdminModal, setShowAddNewAdminModal }) => {
  const [addNewAdminRecord, setAddNewAdminRecord] = useState({
    Name: '',
    DOB: '',
    Gender: '',
    ContactNumber: '',
    Grade: '',
    Email: ''
  });

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('/api/students', addNewAdminRecord);
      console.log('Student added successfully:', response.data);
      // You can add more logic here, such as updating the UI or handling the response
      setShowAddNewAdminModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Modal show={showAddNewAdminModal} onHide={() => setShowAddNewAdminModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAdminName">
            <Form.Label>Admin Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Admin Name' 
              onChange={(e) => setAddNewAdminRecord(newRecord => ({ ...newRecord, Name: e.target.value }))} 
            />
          </Form.Group>
                  

        <Form.Group controlId="formDOB">
            <Form.Label>Date Of Birth</Form.Label>
            <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="yyyy-MM-dd" // Choose your preferred date format
          showPopperArrow={false} // Optional: Hide the popper arrow (customizable)
        />
           </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Gender' 
              onChange={(e) => setAddNewAdminRecord(newRecord => ({ ...newRecord, Gender: e.target.value }))} 
            />
          </Form.Group>
          <Form.Group controlId="formContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Contact Number' 
              onChange={(e) => setAddNewAdminRecord(newRecord => ({ ...newRecord, ContactNumber: e.target.value }))} 
            />
          </Form.Group>
          <Form.Group controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control 
              as="select" 
              onChange={(e) => setAddNewAdminRecord(newRecord => ({ ...newRecord, Grade: e.target.value }))} 
            >
              <option value="">Select Grade</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Email' 
              onChange={(e) => setAddNewAdminRecord(newRecord => ({ ...newRecord, Email: e.target.value }))} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddNewAdminModal(false)}>
          Close
        </Button>
        <Button variant="success" onClick={handleAddAdmin}>
          Add The Student
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewAdminModule;

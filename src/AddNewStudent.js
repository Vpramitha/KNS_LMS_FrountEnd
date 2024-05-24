import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddNewStudentModule = ({ showAddNewStudentModal, setShowAddNewStudentModal }) => {
  const [addNewStudentRecord, setAddNewStudentRecord] = useState({
    StudentName: '',
    Password: '',
    Gender: '',
    ContactNumber: '',
    Grade: '',
    Class: '',
    Email: '',
    DOB: ''
  });

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/addNewStudent', addNewStudentRecord);
      console.log('Student added successfully:', response.data);
      setShowAddNewStudentModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAddNewStudentRecord(newRecord => ({ ...newRecord, DOB: date }));
  };

  return (
    <Modal show={showAddNewStudentModal} onHide={() => setShowAddNewStudentModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formStudentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Full Name' 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, StudentName: e.target.value }))} 
            />
          </Form.Group>
                  
          <Form.Group controlId="formDOB">
            <Form.Label>Date Of Birth</Form.Label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder='Password' 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, Password: e.target.value }))} 
            />
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control 
              as="select" 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, Gender: e.target.value }))} 
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formContactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder='Contact Number' 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, ContactNumber: e.target.value }))} 
            />
          </Form.Group>

          <Form.Group controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control 
              as="select" 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, Grade: e.target.value }))} 
            >
              <option value="">Select Grade</option>
              {[...Array(12).keys()].map(i => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formClass">
            <Form.Label>Class</Form.Label>
            <Form.Control 
              as="select" 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, Class: e.target.value }))} 
            >
              <option value="">Select Class</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="Science A">Science A</option>
              <option value="Science B">Science B</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder='Email' 
              onChange={(e) => setAddNewStudentRecord(newRecord => ({ ...newRecord, Email: e.target.value }))} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddNewStudentModal(false)}>
          Close
        </Button>
        <Button variant="success" onClick={handleAddStudent}>
          Add The Student
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewStudentModule;

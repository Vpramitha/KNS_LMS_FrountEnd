import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import axios from 'axios';
import NavigationBar from './NavBar.js';
import addBookView from './Images/AddNewbook.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddNewStudentModule from './AddNewStudent.js';
import AddNewTeacherModule from './AddNewTeacherModal.js';
import AddNewAdminModule from './AddNewAdminModal.js';

function User() {
  const [key, setKey] = useState('students');
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [showAddNewStudentModal, setShowAddNewStudentModal] = useState(false);
  const [showAddNewTeacherModal, setShowAddNewTeacherModal] = useState(false);
  const [showAddNewAdminModal, setShowAddNewAdminModal] = useState(false);

  const fetchStudentsData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/loadStudents');
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setStudentsData(response.data);
      } else {
        console.error('Unexpected response format for students data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  const fetchTeachersData = async () => {
    try {
      const response = await axios.post('/api/teachers', {});
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setTeachersData(response.data);
      } else {
        console.error('Unexpected response format for teachers data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching teachers data:', error);
    }
  };

  const fetchAdminsData = async () => {
    try {
      const response = await axios.post('/api/admin', {});
      // Ensure the response data is an array
      if (Array.isArray(response.data)) {
        setAdminsData(response.data);
      } else {
        console.error('Unexpected response format for admins data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching admins data:', error);
    }
  };

  const handleRecordClick = (record) => {
    console.log(record);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter data based on search query
    const filteredData = studentsData.filter((item) =>
      item.UserName.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(filteredData);
  };

  useEffect(() => {
    if (key === 'students') {
      fetchStudentsData();
    } else if (key === 'teachers') {
      fetchTeachersData();
    } else if (key === 'admin') {
      fetchAdminsData();
    }
  }, [key]);

  return (
    <div className='Catalog'>
      <NavigationBar showSearch={true} handleSearch={handleSearch} />

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 custom-tabs"
      >
        <Tab eventKey="students" title="Students">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Date Of Birth</th>
                <th>Address</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {searchQuery === '' ? (
                studentsData.map((item, index) => (
                  <tr key={index} onClick={() => handleRecordClick(item)}>
                    <td>{item.Student_Id}</td>
                    <td>{item.UserName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Grade}</td>
                    <td>{item.DOB}</td>
                    <td>{item.Address}</td>
                    <td>{item.ContactNumber}</td>
                  </tr>
                ))
              ) : (
                searchResults.map((item, index) => (
                  <tr key={index} onClick={() => handleRecordClick(item)}>
                    <td>{item.Student_Id}</td>
                    <td>{item.UserName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Grade}</td> 
                    <td>{item.DOB}</td>  
                    <td>{item.Address}</td> 
                    <td>{item.ContactNumber}</td>               
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
            <img src={addBookView} alt="Add New Book" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={() => setShowAddNewStudentModal(true)} />
          </div>

          <AddNewStudentModule
            showAddNewStudentModal={showAddNewStudentModal}
            setShowAddNewStudentModal={setShowAddNewStudentModal}
          />
        </Tab>
        <Tab eventKey="teachers" title="Teachers">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Years of Experience</th>
              </tr>
            </thead>
            <tbody>
              {teachersData.map((teacher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.yearsOfExperience}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
            <img src={addBookView} alt="Add New Book" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={() => setShowAddNewTeacherModal(true)} />
          </div>

          <AddNewTeacherModule
            showAddNewTeacherModal={showAddNewTeacherModal}
            setShowAddNewTeacherModal={setShowAddNewTeacherModal}
          />
        </Tab>
        <Tab eventKey="admin" title="Admin">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Post</th>
                <th>NIC</th>
              </tr>
            </thead>
            <tbody>
              {adminsData.map((admin, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.post}</td>
                  <td>{admin.nic}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <AddNewAdminModule
            showAddNewAdminModal={showAddNewAdminModal}
            setShowAddNewAdminModal={setShowAddNewAdminModal}
          />

          <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
            <img src={addBookView} alt="Add New Book" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={() => setShowAddNewAdminModal(true)} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default User;

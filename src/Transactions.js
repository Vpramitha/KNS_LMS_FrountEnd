/*import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Form, Modal, Table } from 'react-bootstrap';
//import QRCode from 'qrcode.react';
import NavigationBar from './NavBar.js';
import addBookView from './Images/AddNewbook.png';
import QRCodeModal from './QrCodeModal.js';
import SelectCopiesModal from './SelectCopiesModal.js';

function Catalog() {



  const [data, setData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQRData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [AddBookRecord, setAddBookRecord] = useState({});
  const [Categories, setCategories] = useState([]);
  const [selectedCopies, setSelectedCopies] = useState([]);
  const [showSelectedCopiesModal, setShowSelectedCopiesModal]=useState(false);

  const [showOptionModal, setShowOptionModal] = useState(false);

  useEffect(() => {
    fetchData();
    getCategories();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/LoadTransactions');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await Axios.get('http://localhost:3000/getCategories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
    

  return (
    <div className='Catalog'>
      <NavigationBar showSearch={true} handleSearch={handleSearch} />
      <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Registered Date/Time</th>
              <th>Category Id</th>
              <th>Description</th>
              <th>Number Of Pages</th>
              <th>Price in SL Rupees</th>
              <th>Number Of Copies</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery === '' ? (
              data.map((item, index) => (
                <tr key={index} >
                  <td>{item.ISBN}</td>
                  <td>{item.Title}</td>
                  <td>{item.Author}</td>
                  <td>{item.Publisher}</td>
                  <td>{item.RegisteredDate}</td>
                  <td>{item.CategoryId}</td>
                  <td>{item.Description}</td>
                  <td>{item.NumberOfPages}</td>
                  <td>{item.Price_Rs}</td>
                  <td>{item.NumberOfCopies}</td>
                </tr>
              ))
            ) : (
              searchResults.map((item, index) => (
                <tr key={index}>
                  <td>{item.ISBN}</td>
                  <td>{item.Title}</td>
                  <td>{item.Author}</td>
                  <td>{item.Publisher}</td>
                  <td>{item.RegisteredDate}</td>
                  <td>{item.CategoryId}</td>
                  <td>{item.Description}</td>
                  <td>{item.NumberOfPages}</td>
                  <td>{item.Price_Rs}</td>
                  <td>{item.NumberOfCopies}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
    </div> 
    </div>   
    );
};

export default Catalog;*/
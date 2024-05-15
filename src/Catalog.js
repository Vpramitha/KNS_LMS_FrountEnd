import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import NavigationBar from './NavBar.js';
import addBookView from './Images/AddNewbook.png';

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
  //const [Categories, setCategories] = useState([]);

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

  
const saveChanges = async (id) => {
  // Ask for confirmation from the user
  const confirmed = window.confirm('Are you sure you want to save changes?');
  
  if (!confirmed) {
    return; // Do nothing if user cancels
  }

  try {
    // Construct the data object with the required id field
    const data = { id };

    // Send the POST request with the data object as the request body
    const response = await Axios.post('http://localhost:3000/editCatalog', data);

    // Handle response if needed
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
  handleCloseModal();
};

const removeBook = async (id) => {
  // Ask for confirmation from the user
  const confirmed = window.confirm('Are you sure you want to remove this book?');
  
  if (!confirmed) {
    return; // Do nothing if user cancels
  }

  try {
    // Construct the data object with the required id field
    const data = { id };

    // Send the POST request with the data object as the request body
    const response = await Axios.post('http://localhost:3000/removeBook', data);

    // Handle response if needed
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
  handleCloseModal();
};

const issueBook = async (id) => {
  // Ask for confirmation from the user
  const confirmed = window.confirm('Are you sure you want to issue this book?');
  
  if (!confirmed) {
    return; // Do nothing if user cancels
  }
  handleCloseModal();
  setShowIssueModal(true);
};


  const generateQRCode = (record) => {
    const data = JSON.stringify(record);
    setQRData(data);
    setShowQRModal(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter data based on search query
    const filteredData = data.filter((item) =>
      item.Title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredData);
  };

  const addBook = () => {
    console.log(AddBookRecord);
  Axios.post('http://localhost:3000/addBook', AddBookRecord)
    .then(response => {
      // Handle success, e.g., show a success message
      console.log('Book added successfully:', response.data);
      setShowAddBookModal(false);
    })
    .catch(error => {
      // Handle error, e.g., show an error message
      console.error('Error adding book:', error);
    });
};


  return (
    <div className='Catalog'>
      <NavigationBar showSearch={true} handleSearch={handleSearch} />
      <div style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
        <Form className="mb-3">
          <Form.Control
            type="search"
            placeholder="Search by Title"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {searchQuery === '' ? (
              data.map((item, index) => (
                <tr key={index} onClick={() => handleRecordClick(item)}>
                  <td>{item.Title}</td>
                  <td>{item.Author}</td>
                  <td>{item.Price}</td>
                </tr>
              ))
            ) : (
              searchResults.map((item, index) => (
                <tr key={index} onClick={() => handleRecordClick(item)}>
                  <td>{item.Title}</td>
                  <td>{item.Author}</td>
                  <td>{item.Price}</td>
                </tr>
              ))
            )}
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
          
          <Button variant="danger" onClick={()=>{removeBook(selectedRecord.Title)}}>Remove</Button>
          <Button variant="success" onClick={() => {
            // Handle update action here
            saveChanges(selectedRecord.Title);
          }}>
            Save Changes
          </Button>

          <Button onClick={() => generateQRCode(selectedRecord)}>Generate QR</Button>
          <Button variant="warning" onClick={()=>{issueBook(selectedRecord.Title)}}>Issue</Button>
          

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

<Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Issue The Book</Modal.Title>
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
    <Button variant="secondary" onClick={() => setShowQRModal(false)}>
      Close
    </Button>
    <Button variant="primary" >
        Issue
      </Button>
      
  </Modal.Footer>
</Modal>

{/*add book modal */}


<Modal show={showAddBookModal} onHide={() => setShowAddBookModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add a new Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  
  <Form>
    <Form.Group controlId="formISBN">
      <Form.Label>ISBN</Form.Label>
      <Form.Control type="text" placeholder='ISBN' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, ISBN: e.target.value }))} 
 />
    </Form.Group>
    <Form.Group controlId="formTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder='Title' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Title: e.target.value }))} 
/>
    </Form.Group>
    <Form.Group controlId="formAuthor">
      <Form.Label>Author</Form.Label>
      <Form.Control type="text" placeholder='Author' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Author: e.target.value }))} 
/>
    </Form.Group>

  <Form.Group controlId="formPublisher">
      <Form.Label>Publisher</Form.Label>
      <Form.Control type="text" placeholder='Publisher' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Publisher: e.target.value }))} 
/>
    </Form.Group>

    <Form.Group controlId="formDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" placeholder='Description' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Description: e.target.value }))} 
/>
    </Form.Group>

    <Form.Group controlId="formNumberOfPages">
      <Form.Label>Number Of Pages</Form.Label>
      <Form.Control type="text" placeholder='Number Of Pages' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, NumberOfPages: e.target.value }))} 
/>
    </Form.Group>

    <Form.Group controlId="formCategoryId">
      <Form.Label>CategoryId</Form.Label>
      <Form.Control type="text" placeholder='000' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, CategoryId: e.target.value }))} />
    </Form.Group>

    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" placeholder='Price in Rs.' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Price: e.target.value }))} 
/>
    </Form.Group>
  </Form>

  
    
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddBookModal(false)}>
      Close
    </Button>
    <Button variant="success" onClick={()=>addBook()}>
        Add The Book
      </Button>
      
  </Modal.Footer>
</Modal>



</div>
      <div style={{ position: 'fixed', bottom: '0', right: '0', zIndex: '1000', backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
        <img src={addBookView} alt="" style={{ maxWidth: '100%', maxHeight: '100px' }} onClick={()=>{setShowAddBookModal(true)}}/>
      </div>
    </div>
  );
}

export default Catalog;
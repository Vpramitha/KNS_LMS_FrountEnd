import React, { useState, useEffect } from 'react';
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
      const response = await Axios.get('http://localhost:3000/LoadCatalog');
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

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setShowOptionModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
const saveChanges = async (record) => {
    const confirmed = window.confirm('Are you sure you want to save changes?');
    
    if (!confirmed) {
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3000/editBook', record);
      console.log(record);
      console.log('Response:', response.data);
      console.log('Updating is completed');
      //fetchData(); // Refresh the data after update
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
    setShowOptionModal(false);
    const data = JSON.stringify(record);
    setQRData(data);
    setShowQRModal(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter data based on search query
    const filteredData = data.filter((item) =>
      item.Title.toLowerCase().includes(query.toLowerCase()) || item.Author.toLowerCase().includes(query.toLowerCase())
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
      fetchData();
    })
    .catch(error => {
      // Handle error, e.g., show an error message
      console.error('Error adding book:', error);
    });

};

const handleEditOptionClick = () => {
    setShowOptionModal(false); // Close the Options modal
    setShowModal(true); // Open the Edit Record modal
  };

  const handleCopies =()=>{
     
    Axios.post('http://localhost:3000/SelectCopies', selectedRecord)
    .then(response => {
      // Handle success, e.g., show a success message
      console.log('selected copies successfully:', response.data);
      
      setSelectedCopies(response.data);
    })
    .catch(error => {
      // Handle error, e.g., show an error message
      console.error('Error selecting copies book:', error);
    });
    setShowOptionModal(false);
    setShowSelectedCopiesModal(true);
  }

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
                <tr key={index} onClick={() => handleRecordClick(item)}>
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
                <tr key={index} onClick={() => handleRecordClick(item)}>
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
        

 <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form>
    <Form.Group controlId="formISBN">
      <Form.Label>ISBN</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.ISBN : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, ISBN: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Title : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Title: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formAuthor">
      <Form.Label>Author</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Author : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Author: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formPublisher">
      <Form.Label>Publisher</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Publisher : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Publisher: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formCategoryId">
      <Form.Label>Category Id</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.CategoryId : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, CategoryId: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Description : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Description: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formNumberOfPages">
      <Form.Label>Number Of Pages</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.NumberOfPages : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, NumberOfPages: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formPrice">
      <Form.Label>Price in SL Rupees</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Price_Rs : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Price_Rs: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formNumberOfCopies">
      <Form.Label>Number Of Copies</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.NumberOfCopies : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, NumberOfCopies: e.target.value })} />
    </Form.Group>
  </Form>
</Modal.Body>

        <Modal.Footer>
          
          <Button variant="secondary" onClick={() => {
            setShowModal(false);
            setShowOptionModal(true)}
          }>
      Close
    </Button>
          <Button variant="success" onClick={() => {
            // Handle update action here
            saveChanges(selectedRecord);
          }}>
            Save Changes
          </Button>
     
        </Modal.Footer>
      </Modal>

      {/*option modal */}

<Modal show={showOptionModal} onHide={() => setShowOptionModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Options</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form>
    <Form.Group controlId="formTitle">
  <div>
    <strong>Title: </strong> {selectedRecord ? selectedRecord.Title : ''}
  </div>
  <div>
    <strong>Author:</strong> {selectedRecord ? selectedRecord.Author : ''}
  </div>
  <div>
    <strong>Publisher:</strong> {selectedRecord ? selectedRecord.Publisher : ''}
  </div>
  <div>
    <strong>RegisteredDate:</strong> {selectedRecord ? selectedRecord.RegisteredDate : ''}
  </div>
  <div>
    <strong>CategoryId:</strong> {selectedRecord ? selectedRecord.CategoryId : ''}
  </div>
  <div>
    <strong>Description:</strong> {selectedRecord ? selectedRecord.Description : ''}
  </div>
  <div>
    <strong>Number Of Pages:</strong> {selectedRecord ? selectedRecord.NumberOfPages : ''}
  </div>
  <div>
    <strong>Price in SL Rs:</strong> {selectedRecord ? selectedRecord.Price_Rs : ''}
  </div>
  <div>
    <strong>Number Of Copies:</strong> {selectedRecord ? selectedRecord.NumberOfCopies : ''}
  </div>
</Form.Group>


    </Form>
    
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowOptionModal(false)}>
      Close
    </Button>

    <Button variant="warning" onClick={()=>{handleCopies();}}>Copies</Button>
    
    <Button variant="primary" onClick={handleEditOptionClick}>
        Edit
      </Button>
    <Button onClick={() => generateQRCode(selectedRecord)}>Generate QR</Button>
    <Button variant="warning" onClick={()=>{issueBook(selectedRecord.Title)}}>Issue</Button>
      
  </Modal.Footer>
</Modal>

<SelectCopiesModal
  SelectedCopies ={selectedCopies}
  showSelectedCopiesModal ={showSelectedCopiesModal}
  setShowSelectedCopiesModal={setShowSelectedCopiesModal}
  setShowOptionModal={setShowOptionModal}
  setSelectedCopies={setSelectedCopies}
  selectedRecord={selectedRecord}
/>

<QRCodeModal
        qrData={qrData}
        showModal={showQRModal}
        setShowModal={setShowQRModal}
      />

<Modal show={showIssueModal} onHide={() => setShowIssueModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Issue The Book</Modal.Title>
  </Modal.Header>
  <Modal.Body>

  <Form>
    <Form.Group controlId="formISBN">
      <Form.Label>ISBN</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.ISBN : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, ISBN: e.target.value })} />
    </Form.Group>
    <Form.Group controlId="formTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" value={selectedRecord ? selectedRecord.Title : ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, Title: e.target.value })} />
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
  <Form.Label>Category</Form.Label>
  <Form.Control as="select" onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, CategoryId: e.target.value }))}>
   <option value="">Select Category</option>
    {Categories.map(category => (
      <option key={category.catagoryId} value={category.catagoryId}>
        {category.catagoryName}
      </option>
    ))}
  </Form.Control>
</Form.Group>

    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control type="text" placeholder='Price in Rs.' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, Price: e.target.value }))} 
/>
    </Form.Group>

    <Form.Group controlId="formNumberOfCopies">
      <Form.Label>Number Of Copies</Form.Label>
      <Form.Control type="text" placeholder='1' onChange={(e) => setAddBookRecord(newRecord => ({ ...newRecord, NumberOfCopies: e.target.value }))} 
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
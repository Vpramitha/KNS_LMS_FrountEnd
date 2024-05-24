import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Axios from 'axios';

const AddNewCopies = ({ showAddNewCopiesModal,setShowAddNewCopiesModal, setShowSelectedCopiesModal, selectedRecord }) => {
  const [NumberOfCopies, setNumberOfCopies] = useState('');

  const addNewCopy = async () => {
    try {
      await Axios.post('http://localhost:3000/addCopies',
      {NumberOfCopies: NumberOfCopies,
    ISBN: selectedRecord.ISBN });
      
      setNumberOfCopies(''); // Clear the input field
      
      
    } catch (error) {
      console.error('Error adding new copy:', error);
    }
    cancelModal();
  };

  const cancelModal=()=>{
    setShowAddNewCopiesModal(false); // Close the modal after adding the new copy
      setShowSelectedCopiesModal(true);
  }

  return (
    <Modal show={showAddNewCopiesModal} onHide={() => setShowSelectedCopiesModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>The Book Copies</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formCopyCount">
            <Form.Label>Number of Copies</Form.Label>
            <Form.Control
              type="number"
              value={NumberOfCopies}
              onChange={(e) => setNumberOfCopies(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => cancelModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>addNewCopy()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewCopies;

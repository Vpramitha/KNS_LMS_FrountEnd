import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditCopyModal = ({ showEditCopyModal, setShowEditCopyModal, setShowCopyDetailsModal, copy, record, updateCopyDetails }) => {
  const [formData, setFormData] = useState({ ...copy });

  useEffect(() => {
    setFormData({ ...copy });
  }, [copy]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('http://localhost:3000/editCopy', formData);

      if (response.status === 200) {
        alert('Copy details updated successfully.');
        updateCopyDetails(formData); // Update the copy details in the parent component
        setShowEditCopyModal(false);
        setShowCopyDetailsModal(true);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <Modal show={showEditCopyModal} onHide={() => setShowEditCopyModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Copy Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formResourceID">
            <Form.Label>Resource ID</Form.Label>
            <Form.Control
              type="text"
              name="Resource_ID"
              value={formData.Resource_ID}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formCopyNumber">
            <Form.Label>Copy Number</Form.Label>
            <Form.Control
              type="text"
              name="CopyNumber"
              value={formData.CopyNumber}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formAvailability">
            <Form.Label>Availability</Form.Label>
            <Form.Check
              type="checkbox"
              name="Availability"
              checked={formData.Availability}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <Form.Group controlId="formLendingAbility">
            <Form.Label>Lending Ability</Form.Label>
            <Form.Check
              type="checkbox"
              name="Lending_Ability"
              checked={formData.Lending_Ability}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowEditCopyModal(false);
            setShowCopyDetailsModal(true);
          }}
        >
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCopyModal;

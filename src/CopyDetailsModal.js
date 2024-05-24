import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import EditCopyModal from './EditCopyModal';
import IssueCopyModal from './IssueCopyModal';

const CopyDetailsModal = ({ showCopyDetailsModal, setShowCopyDetailsModal, copy, record, setShowSelectedCopiesModal }) => {
  const [showEditCopyModal, setShowEditCopyModal] = useState(false);
  const [showIssueCopyModal, setShowIssueCopyModal] = useState(false);
  const [alert, setAlert] = useState('');

  const handleEditClick = () => {
    setShowEditCopyModal(true);
    setShowCopyDetailsModal(false);
  };

  const handleIssueClick = () => {
    if (copy.Availability && copy.Lending_Ability) {
      setShowIssueCopyModal(true);
    } else {
      setAlert('You cannot issue this copy. It is either unavailable or cannot be lent.');
    }
  };

  const handleSaveEdit = (updatedCopy) => {
    // Logic to update the copy details in the parent component's state or backend
    console.log('Updated copy details:', updatedCopy);
  };

  const handleIssue = (issueDetails) => {
    // Logic to handle issuing the copy (e.g., updating backend, updating state)
    console.log('Issuing copy to user:', issueDetails);
  };

  if (!copy || !record) {
    return null; // Return null if copy or record is not provided
  }

  return (
    <>
      <Modal show={showCopyDetailsModal} onHide={() => setShowCopyDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Copy Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant="danger">{alert}</Alert>}
          <p><strong>Resource ID:</strong> {copy.Resource_ID}</p>
          <p><strong>Copy Number:</strong> {copy.CopyNumber}</p>
          <p><strong>Availability:</strong> {copy.Availability ? "Available" : "Unavailable"}</p>
          <p><strong>Lending Ability:</strong> {copy.Lending_Ability ? "Can" : "Cannot"}</p>
          <hr />
          <h5>The Book Details</h5>
          <p><strong>ISBN:</strong> {record.ISBN}</p>
          <p><strong>Title:</strong> {record.Title}</p>
          <p><strong>Author:</strong> {record.Author}</p>
          <p><strong>Publisher:</strong> {record.Publisher}</p>
          {/* Add more details as needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { 
            setShowCopyDetailsModal(false); 
            setShowSelectedCopiesModal(true); }}>Close</Button>

          <Button variant="primary" onClick={handleIssueClick}>Issue</Button>
          <Button variant="primary" onClick={handleEditClick}>Edit</Button>
        </Modal.Footer>
      </Modal>

      <EditCopyModal
        showEditCopyModal={showEditCopyModal}
        setShowEditCopyModal={setShowEditCopyModal}
        setShowCopyDetailsModal={setShowCopyDetailsModal}
        copy={copy}
        record={record}
      />

      <IssueCopyModal
        show={showIssueCopyModal}
        onHide={() => setShowIssueCopyModal(false)}
        copy={copy}
        onIssue={handleIssue}
      />
    </>
  );
};

export default CopyDetailsModal;

import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import AddNewCopies from './AddNewCopy';
import CopyDetailsModal from './CopyDetailsModal.js';
import EditCopyModal from './EditCopyModal.js'; // Import the EditCopyModal component

const SelectCopiesModal = ({ selectedRecord, setSelectedCopies, SelectedCopies, showSelectedCopiesModal, setShowSelectedCopiesModal, setShowOptionModal }) => {
  const [showAddNewCopiesModal, setShowAddNewCopiesModal] = useState(false);
  const [showCopyDetailsModal, setShowCopyDetailsModal] = useState(false);
  const [showEditCopyModal, setShowEditCopyModal] = useState(false); // State to control EditCopyModal
  const [selectedCopy, setSelectedCopy] = useState(null);

  const handleRowClick = (copy) => {
    setSelectedCopy(copy);
    setShowCopyDetailsModal(true);
    setShowSelectedCopiesModal(false);
  };

  const updateCopyDetails = (updatedCopy) => {
    setSelectedCopies((prevCopies) =>
      prevCopies.map((copy) => (copy.CopyNumber === updatedCopy.CopyNumber ? updatedCopy : copy))
    );
  };

  return (
    <div>
      <Modal show={showSelectedCopiesModal} onHide={() => setShowSelectedCopiesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>The Book Copies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Resource ID</th>
                <th>Copy number</th>
                <th>Availability</th>
                <th>Lending ability</th>
              </tr>
            </thead>
            <tbody>
              {SelectedCopies.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                  <td>{item.Resource_ID}</td>
                  <td>{item.CopyNumber}</td>
                  <td>{item.Availability ? "Available" : "Unavailable"}</td>
                  <td>{item.Lending_Ability ? "Can" : "Cannot"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowSelectedCopiesModal(false);
              setShowOptionModal(true);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowAddNewCopiesModal(true);
              setShowSelectedCopiesModal(false);
            }}
          >
            ADD New Copy
          </Button>
        </Modal.Footer>
      </Modal>

      <AddNewCopies
        showAddNewCopiesModal={showAddNewCopiesModal}
        setShowAddNewCopiesModal={setShowAddNewCopiesModal}
        setShowSelectedCopiesModal={setShowSelectedCopiesModal}
        selectedRecord={selectedRecord}
      />

      <CopyDetailsModal
        showCopyDetailsModal={showCopyDetailsModal}
        setShowCopyDetailsModal={setShowCopyDetailsModal}
        copy={selectedCopy}
        record={selectedRecord}
        setShowSelectedCopiesModal={setShowSelectedCopiesModal}
        setShowEditCopyModal={setShowEditCopyModal} // Pass setShowEditCopyModal
      />

      <EditCopyModal
        showEditCopyModal={showEditCopyModal}
        setShowEditCopyModal={setShowEditCopyModal}
        setShowCopyDetailsModal={setShowCopyDetailsModal}
        copy={selectedCopy}
        record={selectedRecord}
        updateCopyDetails={updateCopyDetails} // Pass updateCopyDetails
      />
    </div>
  );
};

export default SelectCopiesModal;

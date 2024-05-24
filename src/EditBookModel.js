// EditBookModal.js

import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EditBookModal = ({
  showModal,
  handleCloseModal,
  selectedRecord,
  setSelectedRecord,
  saveChanges
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formISBN">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.ISBN : ''}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, ISBN: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.Title : ''}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, Title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.Author : ''}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, Author: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPublisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.Publisher : ''}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  Publisher: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formCategoryId">
            <Form.Label>Category Id</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.CategoryId : ''}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  CategoryId: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.Description : ''}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  Description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formNumberOfPages">
            <Form.Label>Number Of Pages</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.NumberOfPages : ''}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  NumberOfPages: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price in SL Rupees</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.Price_Rs : ''}
              onChange={(e) =>
                setSelectedRecord({ ...selectedRecord, Price_Rs: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formNumberOfCopies">
            <Form.Label>Number Of Copies</Form.Label>
            <Form.Control
              type="text"
              value={selectedRecord ? selectedRecord.NumberOfCopies : ''}
              onChange={(e) =>
                setSelectedRecord({
                  ...selectedRecord,
                  NumberOfCopies: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            handleCloseModal();
          }}
        >
          Close
        </Button>
        <Button variant="success" onClick={() => saveChanges(selectedRecord)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookModal;

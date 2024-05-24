import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const IssueCopyModal = ({ show, onHide, copy, onIssue }) => {
  const [userId, setUserId] = useState('');
  const [duration, setDuration] = useState('');

  const handleIssue = () => {
    onIssue({ userId, duration });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Issue Copy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration (days)</Form.Label>
            <Form.Control
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleIssue}>Issue</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IssueCopyModal;

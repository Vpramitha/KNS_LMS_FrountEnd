import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';

const QRCodeModal = ({ qrData, showModal, setShowModal }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QRCode value={qrData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary">
          Print QR Code
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QRCodeModal;

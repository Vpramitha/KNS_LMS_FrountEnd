import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { QrReader } from 'react-qr-reader';


const QRCodeReaderModule = ({ showQRCodeReaderModal, setShowQRCodeReaderModal }) => {
  const [qrCodeResult, setQrCodeResult] = useState('');
  const [delay, setDelay] = useState(300); // Initial delay

  const handleScan = (data) => {
    if (data) {
      setQrCodeResult(data);
      setDelay(10000); // Delay next scan by 10 seconds
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    if (delay === 10000) {
      const timer = setTimeout(() => {
        setDelay(300); // Reset delay to initial value
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <Modal show={showQRCodeReaderModal} onHide={() => setShowQRCodeReaderModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Scan QR Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <QrReader
          delay={delay}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
        {qrCodeResult && (
          <Form.Group controlId="formQRCodeResult">
            <Form.Label>QR Code Result</Form.Label>
            <Form.Control type="text" value={qrCodeResult} readOnly />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowQRCodeReaderModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QRCodeReaderModule;

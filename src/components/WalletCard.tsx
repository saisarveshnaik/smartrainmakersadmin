import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import '../styles/WalletCard.css';
import { Modal, Button } from 'react-bootstrap';
import { QRCodeSVG } from 'qrcode.react';

const WalletCard: React.FC = () => {
  const { wallets, loading } = useWallet();
  const [showModal, setShowModal] = useState(false);
  const cryptoAddress = "0x1234abcd5678efgh"; // Example address

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  if (loading) return <p>Loading wallet data...</p>;
  if (!wallets) return <p>No data available.</p>;

  return (
    <div className="container">
      <div className="row mt-4">
        {/* Card 1 - Deposit Balance */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card1">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>${wallets.depositBalance.toFixed(2)}</h5>
              <p className="card-text">Deposit Balance</p>
            </div>
          </div>
        </div>

        {/* Card 2 - Withdrawal Balance */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card2">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>${wallets.withdrawalBalance.toFixed(2)}</h5>
              <p className="card-text">Withdrawal Balance</p>
              <a href="#" className="btn btn-primary" onClick={handleShow}>Deposit</a>
            </div>
          </div>
        </div>

        {/* Card 3 - Expected Payout */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card3">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>${wallets.expectedPayoutWallet.toFixed(2)}</h5>
              <p className="card-text">Expected Payout</p>
            </div>
          </div>
        </div>

        {/* Card 4 - Reserved Wallet */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body card4">
              <h5 className="card-title" style={{ fontSize: '1.5rem' }}>${wallets.reservesWallet.toFixed(2)}</h5>
              <p className="card-text">Reserved Wallet</p>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered className="modal-dark">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-wallet me-2"></i> Deposit Crypto
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center modal-body-dark">
          <p className="fw-bold">Send your payment to the following crypto address:</p>
          <div className="d-flex justify-content-between align-items-center qr-code-container p-2 rounded">
            <span className="wallet-address-text">{cryptoAddress}</span>
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={() => navigator.clipboard.writeText(cryptoAddress)}
            >
              <i className="fas fa-copy"></i>
            </Button>
          </div>
          <div className="qr-code-container mt-3 p-3 shadow-sm rounded">
            <QRCodeSVG value={cryptoAddress} size={180} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WalletCard;
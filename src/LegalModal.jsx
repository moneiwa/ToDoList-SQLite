import React from 'react';
import { Link } from 'react-router-dom'; 
import './index.css';

const c = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modalTitle" aria-hidden={!isOpen}>
      <div className="modal-content">
        <h2 id="modalTitle">Terms & Conditions</h2>
        
        <p><strong>Privacy & Data Regulations</strong></p>
       
        <p>
          By using our website  <a href="/privacy-policy">Privacy Policy</a> which details how we collect, use, and protect your information.
        </p>

        <p><strong>PayPal Transaction Regulations</strong></p>
        <p>
         
        </p>

        <div className="modal-buttons">
          <button onClick={closeModal}>Close</button>
          
       
          <Link to="/bookings">
            <button onClick={closeModal}>Proceed with Booking</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;

import React, { useState } from 'react';
import './Donations.css';

const Donations = () => {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
    anonymous: false
  });

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setAmount('custom');
    }
  };

  const handleDonorInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationAmount = amount === 'custom' ? customAmount : amount;
    console.log('Donation submitted:', {
      amount: donationAmount,
      donorInfo
    });
    // TODO: Add payment processing integration
  };

  return (
    <div className="donations-page">
      <div className="donations-header">
        <h1>Support Our Mission</h1>
        <p>Your donation helps us preserve and promote Edo cultural heritage in Italy</p>
      </div>

      <div className="donations-container">
        <div className="donation-info">
          <h2>Why Donate?</h2>
          <div className="donation-benefits">
            <div className="benefit-item">
              <h3>Cultural Preservation</h3>
              <p>Help preserve Edo cultural heritage for future generations</p>
            </div>
            <div className="benefit-item">
              <h3>Educational Programs</h3>
              <p>Support cultural education and awareness initiatives</p>
            </div>
            <div className="benefit-item">
              <h3>Community Events</h3>
              <p>Enable us to organize more cultural events and festivals</p>
            </div>
          </div>
        </div>

        <div className="donation-form">
          <form onSubmit={handleSubmit}>
            <div className="amount-section">
              <h3>Select Amount</h3>
              <div className="amount-options">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`amount-btn ${amount === value ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect(value)}
                  >
                    €{value}
                  </button>
                ))}
                <div className="custom-amount">
                  <input
                    type="text"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    onClick={() => setAmount('custom')}
                    className={amount === 'custom' ? 'selected' : ''}
                  />
                </div>
              </div>
            </div>

            <div className="donor-section">
              <h3>Your Information</h3>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={donorInfo.name}
                  onChange={handleDonorInfoChange}
                  disabled={donorInfo.anonymous}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={donorInfo.message}
                  onChange={handleDonorInfoChange}
                  placeholder="Leave a message with your donation"
                />
              </div>

              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={donorInfo.anonymous}
                  onChange={handleDonorInfoChange}
                />
                <label htmlFor="anonymous">Make my donation anonymous</label>
              </div>
            </div>

            <button type="submit" className="donate-btn" disabled={!amount || (amount === 'custom' && !customAmount)}>
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donations; 
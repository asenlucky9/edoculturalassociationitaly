import React, { useState } from 'react';

const Donation = () => {
    const [paymentMethod, setPaymentMethod] = useState('paypal'); // Default payment method
    const [cardDetails, setCardDetails] = useState({
        name: '',
        number: '',
        cvv: '',
        address: '',
        email: ''
    });
    const [expiryMonth, setExpiryMonth] = useState(''); // State for month
    const [expiryYear, setExpiryYear] = useState(''); // State for year
    const [amount, setAmount] = useState(1); // Default donation amount
    const [paypalEmail, setPaypalEmail] = useState(''); // For PayPal email
    const [error, setError] = useState('');

    const handleCardPayment = (event) => {
        event.preventDefault();
        // Perform validation for credit card payment
        if (!cardDetails.name || !cardDetails.number || !cardDetails.cvv || !cardDetails.address || !expiryMonth || !expiryYear) {
            setError('Please fill in all credit card fields.');
            return;
        }
        // Handle credit card payment processing here (e.g., call your backend)
        alert('Credit card donation processed!');
        // Reset form
        setCardDetails({ name: '', number: '', cvv: '', address: '', email: '' });
        setExpiryMonth('');
        setExpiryYear('');
        setAmount(1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in cardDetails) {
            setCardDetails((prev) => ({ ...prev, [name]: value }));
        } else {
            setAmount(value);
        }
    };

    const handlePaypalEmailChange = (e) => {
        setPaypalEmail(e.target.value);
    };

    const handlePayPalPayment = () => {
        // Trigger PayPal payment process
        if (!paypalEmail) {
            setError('Please enter your PayPal email.');
            return;
        }

        // Here, you would ideally trigger the PayPal payment process
        alert(`Redirecting to PayPal for payment from ${paypalEmail}`);
    };

    return (
        <div>
            <h2>Support the Edo Cultural Association</h2>
            <p>Your contributions help us to preserve and promote Edo culture through various events and initiatives. Thank you for your support!</p>

            <h3>Make a Donation</h3>

            <div>
                <label>
                    <input 
                        type="radio" 
                        value="paypal" 
                        checked={paymentMethod === 'paypal'} 
                        onChange={() => setPaymentMethod('paypal')} 
                    />
                    Donate via PayPal
                </label>
                <label>
                    <input 
                        type="radio" 
                        value="creditCard" 
                        checked={paymentMethod === 'creditCard'} 
                        onChange={() => setPaymentMethod('creditCard')} 
                    />
                    Donate via Credit Card
                </label>
            </div>

            {paymentMethod === 'paypal' ? (
                <>
                    <div>
                        <label htmlFor="paypalEmail">PayPal Email:</label>
                        <input 
                            type="email" 
                            id="paypalEmail" 
                            value={paypalEmail} 
                            onChange={handlePaypalEmailChange} 
                            required 
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={handlePayPalPayment}>Donate to Proceed</button>
                </>
            ) : (
                <form onSubmit={handleCardPayment}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={cardDetails.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="number">Credit Card Number:</label>
                        <input 
                            type="text" 
                            id="number" 
                            name="number" 
                            value={cardDetails.number} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="expiry">Expiration Date:</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select 
                                id="expiryMonth" 
                                value={expiryMonth} 
                                onChange={(e) => setExpiryMonth(e.target.value)} 
                                required
                            >
                                <option value="" disabled>Select Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={(i + 1).toString().padStart(2, '0')}>
                                        {`${i + 1} - ${new Date(0, i).toLocaleString('en-US', { month: 'long' })}`}
                                    </option>
                                ))}
                            </select>
                            <select 
                                id="expiryYear" 
                                value={expiryYear} 
                                onChange={(e) => setExpiryYear(e.target.value)} 
                                required
                            >
                                <option value="" disabled>Select Year</option>
                                {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV:</label>
                        <input 
                            type="text" 
                            id="cvv" 
                            name="cvv" 
                            value={cardDetails.cvv} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Billing Address:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            value={cardDetails.address} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={cardDetails.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Donation Amount (€):</label>
                        <input 
                            type="number" 
                            id="amount" 
                            value={amount} 
                            onChange={handleChange} 
                            required 
                            min="1" 
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit">Donate</button>
                </form>
            )}
        </div>
    );
};

export default Donation;

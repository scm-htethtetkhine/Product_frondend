import React, { useState } from 'react';
import axios from 'axios';

const PointCalculator = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [point, setPoint] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset message on new submission
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8080/salereceipt/add', {
        amount: parseFloat(amount),
        email,
      });
      
      // Update point if the response is successful
      setPoint(response.data.point);
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors, display appropriate messages
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="Form">
    <form onSubmit={handleSubmit} className="auth-form">
    <h2 className="title">Point Calculate</h2>
    <div className="form-group">
    <label htmlFor="email">Amount</label>
    <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    />
    </div>

    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
    type="email"
    value={email}
            onChange={(e) => setEmail(e.target.value)}
    />
    </div>
    
    <button type="submit" className="btn-submit">
    Calculate Points
    </button>
    </form>
    {message && <p>{message}</p>}
    {point !== null && <p>Updated Points: {point}</p>}
    </div>
    
  );
};

export default PointCalculator;

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Transaction.css';
import Navbar from './navbar';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You are not authenticated. Please log in.');
        navigate('/login');
        return;
      }

      const response = await fetch('http://127.0.0.1:5555/transactions', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the token in the headers
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error('Failed to fetch transactions');
        if (response.status === 401) {
          alert('Unauthorized. Please log in again.');
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access denied. Admins only.');
      navigate('/login');
    } else {
      fetchTransactions();
    }
  }, [fetchTransactions, navigate]);

  const totalSum = transactions.reduce((sum, transaction) => sum + transaction.total, 0);

  const generateTotalAmount = () => {
    alert(`Total amount generated: $${totalSum.toFixed(2)}`);
  };

  return (
    <div>
      <Navbar />
      <div className="transaction-container">
        <h1>Transaction History</h1>
        <div className="transaction-summary">
          <p><strong>Total Transactions:</strong> {transactions.length}</p>
          <p><strong>Total Revenue:</strong> ${totalSum.toFixed(2)}</p>
          <button onClick={generateTotalAmount}>Generate Total Amount</button>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.userName}</td>
                <td>{transaction.date}</td>
                <td>{transaction.items.join(', ')}</td>
                <td>${transaction.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;

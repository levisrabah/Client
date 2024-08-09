import React from 'react';
import '../styles/Transaction.css';
import Navbar from './navbar';
import { useTransactions } from './TransactionContext';

const Transaction = () => {
  const { transactions } = useTransactions();
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
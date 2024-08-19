import React, { useEffect, useState } from 'react';

import Navbar from './navbar';
import '../styles/DailyOffer.css';

const DailyOffer = ({ addToBasket }) => {
  const [offers, setOffers] = useState({});
  const [editingOffer, setEditingOffer] = useState(null);
  const [creatingOffer, setCreatingOffer] = useState(false);
  const [offerForm, setOfferForm] = useState({
    date: '',
    mealId: '',
    name: '',
    description: '',
    price: ''
  });
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    const userToken = localStorage.getItem('token');
    setRole(userRole);
    setToken(userToken);

    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('https://blaze-server-1xqz.onrender.com/offers');
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      } else {
        console.error('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddToBasket = (offer) => {
    addToBasket(offer);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setOfferForm({
      date: new Date().toISOString().split('T')[0],
      name: offer.name,
      description: offer.description,
      price: offer.price
    });
  };

  const handleDelete = async (offer) => {
    try {
      const response = await fetch(`https://blaze-server-1xqz.onrender.com/offers/${offer.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchOffers();
      } else {
        console.error('Failed to delete offer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFormChange = (e) => {
    setOfferForm({
      ...offerForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOffer) {
        const updatedData = {
          date: offerForm.date,
          meal: {
            name: offerForm.name,
            description: offerForm.description,
            price: offerForm.price
          }
        };
        const response = await fetch(`https://blaze-server-1xqz.onrender.com/offers/${editingOffer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedData)
        });
        if (response.ok) {
          setEditingOffer(null);
          fetchOffers();
        } else {
          console.error('Failed to update offer');
        }
      } else {
        const newOfferData = {
          date: offerForm.date,
          meals: [offerForm.mealId]
        };
        const response = await fetch('https://blaze-server-1xqz.onrender.com/offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newOfferData)
        });
        if (response.ok) {
          setCreatingOffer(false);
          setOfferForm({
            date: '',
            mealId: ''
          });
          fetchOffers();
        } else {
          console.error('Failed to create offer');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="daily-offer-container">
      <Navbar />
      <h1 className="main-title">Check out today's offers:</h1>

      {role === 'admin' && (
        <>
          <button className="add-offer-button" onClick={() => setCreatingOffer(true)}>Add Offer</button>
          {creatingOffer && (
            <div className="add-form-container">
              <form onSubmit={handleFormSubmit}>
                <label>
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={offerForm.date}
                    onChange={handleFormChange}
                  />
                </label>
                <label>
                  Meal ID:
                  <input
                    type="text"
                    name="mealId"
                    value={offerForm.mealId}
                    onChange={handleFormChange}
                  />
                </label>
                <button type="submit">Create Offer</button>
                <button type="button" onClick={() => setCreatingOffer(false)}>Cancel</button>
              </form>
            </div>
          )}
        </>
      )}

      {Object.keys(offers).map(date => (
        <div key={date} className="date-section">
          <h2 className="date-title">{date}</h2>
          <div className="offers-grid">
            {offers[date].map((offer, index) => (
              <div key={index} className="offer-card">
                <img src={offer.image} alt={offer.name} className="offer-image" />
                <div className="offer-details">
                  <h3 className="offer-name">{offer.name}</h3>
                  <p className="offer-description">{offer.description}</p>
                  <p className="offer-price">${offer.price}</p>
                  {role === 'admin' && (
                    <>
                      <button className="edit-button" onClick={() => handleEdit(offer)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(offer)}>Delete</button>
                    </>
                  )}
                  {role === 'user' && (
                    <button className="order-button" onClick={() => handleAddToBasket(offer)}>Order</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showSuccessPopup && (
        <div className="pop">The Order was Successfully Placed</div>
      )}

      {editingOffer && (
        <div className="edit-form-container">
          <form onSubmit={handleFormSubmit}>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={offerForm.date}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={offerForm.name}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={offerForm.description}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={offerForm.price}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingOffer(null)}>Cancel</button>
          </form>
        </div>
      )}
      </div>
  );
};

export default DailyOffer;

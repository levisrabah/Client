import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import '../styles/DailyOffer.css';

const DailyOffer = () => {
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
  const [role, setRole] = useState(''); // State to store the user's role
  const [token, setToken] = useState(''); // State to store JWT token

  useEffect(() => {
    const userRole = localStorage.getItem('role'); // Get role from local storage
    const userToken = localStorage.getItem('token'); // Get token from local storage
    setRole(userRole);
    setToken(userToken);

    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/offers');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setOffers(data);
      } else {
        console.error('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setOfferForm({
      date: new Date().toISOString().split('T')[0], // Default to today's date
      name: offer.name,
      description: offer.description,
      price: offer.price
    });
  };

  const handleDelete = async (offer) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/offers/${offer.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        console.log('Deleted offer:', offer);
        fetchOffers(); // Refresh offers after deletion
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
        // Handle update
        const updatedData = {
          date: offerForm.date,
          meal: {
            name: offerForm.name,
            description: offerForm.description,
            price: offerForm.price
          }
        };
        const response = await fetch(`http://127.0.0.1:5555/offers/${editingOffer.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedData)
        });
        if (response.ok) {
          console.log('Updated offer:', editingOffer);
          setEditingOffer(null);
          fetchOffers(); // Refresh offers after update
        } else {
          console.error('Failed to update offer');
        }
      } else {
        // Handle create
        const newOfferData = {
          date: offerForm.date,
          meals: [offerForm.mealId] // Adjust based on your backend requirements
        };
        const response = await fetch('http://127.0.0.1:5555/offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newOfferData)
        });
        if (response.ok) {
          console.log('Created new offer');
          setCreatingOffer(false);
          setOfferForm({
            date: '',
            mealId: ''
          });
          fetchOffers(); // Refresh offers after creation
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
      <Navbar /> {/* Render Navbar component */}
      <h1 className="main-title">Check out today's offers:</h1>

      {/* Admin functionality to add a new offer */}
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
                  {role === 'admin' && ( // Conditionally render buttons based on role
                    <>
                      <button className="edit-button" onClick={() => handleEdit(offer)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(offer)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

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

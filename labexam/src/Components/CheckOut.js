import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './CSS/CheckOut.css';

function Checkout() {
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: ""
  });

  const { state } = useLocation();
  const { cartItems, totalPrice } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const proceedToCompleteOrder = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to proceed to complete the order?");
    if (confirmed) {
      axios.delete('http://127.0.0.1:8000/api/removes')
        .then(response => {
          console.log('Items removed from the cart:', response.data);
          navigate("/");
        })
        .catch(error => {
          console.error('Error removing items from the cart:', error);
        });
    }
  };

  return (
    <div className="mt-5 container py-5">
      <h1 className="text-center mb-4 fs-2">Checkout</h1>
      <form onSubmit={proceedToCompleteOrder}>
        <div className="input">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={shippingDetails.name} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={shippingDetails.address} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" name="city" value={shippingDetails.city} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="mt-5">
          <h2>Cart Items</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <strong>Total Items: {cartItems.length}</strong>
          </p>
          <p>
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </p>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="mb-5 btn btn-primary p-2">Proceed</button>
        </div>
      </form>
    </div>
  );  
}

export default Checkout;

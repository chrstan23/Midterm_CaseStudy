import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CSS/ViewCart.css'

function ViewCart({ summary, setSummary }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/carts');
        const cartData = response.data;

        // Fetch product details for each item in the cart
        const updatedCartItems = await Promise.all(cartData.map(async (cartItem) => {
          const productDetails = await getProductDetails(cartItem.product_id);
          return {
            ...cartItem,
            name: productDetails.name,
            price: productDetails.price
          };
        }));

        setCartItems(updatedCartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  async function getProductDetails(productId) {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  }

  async function removeFromCart(index, cartId) {
    const confirmRemove = window.confirm("Are you sure you want to remove this item from the cart?");
    if (confirmRemove) {
      setSummary(prevSummary => ({
        items: prevSummary.items.filter((_, i) => i !== index)
      }));
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      await axios.delete(`http://127.0.0.1:8000/api/removes/${cartId}`);
    }
  }

  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Cart Items:", cartItems);
    console.log("Total Price:", totalPrice);

    navigate('/checkout', {
      state: { cartItems, totalPrice }
    });
  };  

  return (
    <div className="mt-5 container py-5">
      <h1 className="text-center mb-4 fs-2">Your Shopping Cart</h1>
      <div className="text-center mb-4">
        <p className="mb-1">
          <strong>Total Items: {cartItems.length}</strong>
        </p>
        <p>
          <strong>Total Price: ₱{totalPrice.toFixed(2)}</strong>
        </p>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="btn btn-danger" onClick={() => removeFromCart(index, item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button 
          className="btn btn-primary btn-lg ps-5 pe-5 mb-3" 
          onClick={handleCheckout} 
          disabled={cartItems.length === 0} // Disable the button if cartItems.length is 0
        >
          Checkout
        </button>
      </div>
    </div>
  );  
}

export default ViewCart;

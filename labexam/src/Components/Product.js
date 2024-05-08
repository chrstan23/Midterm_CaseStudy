import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash"; // Import debounce function from lodash
import './CSS/Product.css';

function Product({ summary, setSummary }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const addToCartAPI = async (productId, quantity) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/adds', {
        product_id: productId,
        quantity: quantity
      });
      console.log('Item added to cart:', response.data);
      // Handle updating UI or other logic as needed
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Debounce the addToCartAPI function to prevent multiple rapid API calls
  const debouncedAddToCartAPI = debounce(addToCartAPI, 1000);

  useEffect(() => {
    // Whenever cartItems change, update the cart through API
    Object.entries(cartItems).forEach(([productId, quantity]) => {
      debouncedAddToCartAPI(productId, quantity); // Call the debounced function
    });
  }, [cartItems, debouncedAddToCartAPI]); // Include debouncedAddToCartAPI in the dependency array

  const handleAddToCart = (productId) => {
    // If the product already exists in the cart, update its quantity, otherwise add it to the cart
    if (cartItems[productId]) {
      setCartItems(prevCartItems => ({
        ...prevCartItems,
        [productId]: prevCartItems[productId] + 1
      }));
    } else {
      setCartItems(prevCartItems => ({
        ...prevCartItems,
        [productId]: 1
      }));
    }
  };

  return (
    <div className="mt-5 mb-5 container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map(product => (
          <div key={product.id} className="col mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₱{product.price}</p>
                <button className="btn btn-secondary" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
              </div>
              <div className="card-footer bg-transparent">
                <small className="text-muted">{product.description}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );  
}

export default Product;

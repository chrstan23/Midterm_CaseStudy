import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Link } from 'react-router-dom';
import Product from "./Component/Product";
import ViewCart from "./Component/ViewCart";
import Checkout from "./Component/CheckOut";
import image from "./ROADMASTERS.png";
import './App.css';

function Home() {
  return (
    <div className="mt-5 container">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="image">
        <img width={300} src={image} alt="Company Logo" className="m-3"/>

        </div>
        <div className="text-center">
          <Link to="/products" className="btn btn-primary btn-lg border">Proceed to Shopping</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [summary, setSummary] = useState({ items: [] });
  return (
    <Router>
      <div>
        <header className="navbar navbar-dark bg-custom-primary">
          <Link to="/"></Link>
          <nav className="me-5">
            <ul className="navbar-nav list-unstyled fs-2 fw-bold">
              <li className="nav-item me-4"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link to="/cart" className="nav-link">My Cart</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product summary={summary} setSummary={setSummary} />} />
          <Route path="/cart" element={<ViewCart summary={summary} setSummary={setSummary} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

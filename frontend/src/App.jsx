import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import TrackingPage from './pages/TrackingPage';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleOrderSuccess = (data) => {
    setOrderId(data.order_id);
    setSelectedProduct(null);
    alert(`Order Placed Successfully! Your Order ID is: ${data.order_id}`);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>FreshBulk</h1>
          <div className="links">
            <Link to="/">Catalogue</Link>
            <Link to="/track">Track Order</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={
              <>
                <ProductList onSelectProduct={setSelectedProduct} />
                {selectedProduct && (
                  <OrderForm
                    product={selectedProduct}
                    onCancel={() => setSelectedProduct(null)}
                    onOrderSuccess={handleOrderSuccess}
                  />
                )}
              </>
            } />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

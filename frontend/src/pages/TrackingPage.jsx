import React, { useState } from 'react';
import { getOrder } from '../services/api';

const TrackingPage = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setStatus(null);
        try {
            const res = await getOrder(orderId);
            setStatus(res.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Order not found. Please check your Order ID.');
            } else {
                setError('Error fetching order status.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tracking-page">
            <h2>Track Your Order</h2>
            <form onSubmit={handleTrack} className="search-form">
                <input
                    type="text"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>Track</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {status && (
                <div className="order-details card">
                    <h3>Order #{status.id}</h3>
                    <p><strong>Status:</strong> <span className={`status ${status.status.toLowerCase()}`}>{status.status}</span></p>
                    <p><strong>Item:</strong> {status.product_name} (x{status.quantity})</p>
                    <p><strong>Buyer:</strong> {status.buyer_name}</p>
                    <p><strong>Address:</strong> {status.address}</p>
                </div>
            )}
        </div>
    );
};

export default TrackingPage;

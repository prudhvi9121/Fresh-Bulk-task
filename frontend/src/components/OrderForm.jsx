import React, { useState } from 'react';
import { placeOrder } from '../services/api';

const OrderForm = ({ product, onCancel, onOrderSuccess }) => {
    const [formData, setFormData] = useState({
        buyer_name: '',
        address: '',
        quantity: 1
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const orderData = {
                ...formData,
                product_id: product.id,
                product_name: product.name
            };
            const res = await placeOrder(orderData);
            onOrderSuccess(res.data);
        } catch (err) {
            setError('Failed to place order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Order {product.name}</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            required
                            value={formData.buyer_name}
                            onChange={e => setFormData({ ...formData, buyer_name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <textarea
                            required
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity ({product.unit}):</label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="actions">
                        <button type="button" onClick={onCancel} disabled={submitting}>Cancel</button>
                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Placing Order...' : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;

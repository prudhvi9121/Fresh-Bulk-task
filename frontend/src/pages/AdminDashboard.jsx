import React, { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus } from '../services/api';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        getAdminOrders()
            .then(res => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch(err => {
                alert('Failed to fetch orders');
                setLoading(false);
            });
    };

    const markDelivered = (id) => {
        updateOrderStatus(id, 'Delivered')
            .then(() => {
                // Optimistic update or refetch
                setOrders(orders.map(o => o.id === id ? { ...o, status: 'Delivered' } : o));
            })
            .catch(err => {
                alert('Failed to update status');
            });
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Buyer</th>
                        <th>Address</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.buyer_name}</td>
                            <td>{order.address}</td>
                            <td>{order.product_name}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                {order.status === 'Pending' && (
                                    <button onClick={() => markDelivered(order.id)}>
                                        Mark Delivered
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;

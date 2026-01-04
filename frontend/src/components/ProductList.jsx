import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const ProductList = ({ onSelectProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load products');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list">
            <h2>Available Fresh Produce</h2>
            <div className="grid">
                {products.map(product => (
                    <div key={product.id} className="card">
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="product-image"
                            />
                        )}
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price} / {product.unit}</p>
                        <button onClick={() => onSelectProduct(product)}>Order Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;

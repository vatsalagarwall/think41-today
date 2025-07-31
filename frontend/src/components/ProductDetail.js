import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2>{product.name}</h2>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Department:</strong> {product.department}</p>
            <p><strong>Cost:</strong> ₹{product.cost}</p>
            <p><strong>Retail Price:</strong> ₹{product.retail_price}</p>
            <Link to="/" className="btn btn-secondary">Back to Products</Link>
        </div>
    );
}

export default ProductDetail;
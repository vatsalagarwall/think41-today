import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function DepartmentProducts() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/departments/${id}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));

        axios.get(`http://localhost:3000/api/departments/${id}`)
            .then(res => setDepartment(res.data))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className="container mt-4">
            {department && <h2>{department.name} ({products.length} items)</h2>}
            <Link to="/" className="btn btn-secondary mb-3">← All Products</Link>

            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5>{product.name}</h5>
                                <p>₹{product.retail_price}</p>
                                <Link to={`/departments/${id} /${product.name}`} className="btn btn-primary">View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default DepartmentProducts;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function ProductList() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3000/api/products')
//             .then(res => setProducts(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     return (
//         <div className="container mt-4">
//             <h2>Product List</h2>
//             <div className="row">
//                 {products.map(product => (
//                     <div key={product.id} className="col-md-4 mb-3">
//                         <div className="card h-100">
//                             <div className="card-body">
//                                 <h5 className="card-title">{product.name}</h5>
//                                 <p className="card-text">₹{product.retail_price}</p>
//                                 <Link to={`/product/${product.id}`} className="btn btn-primary">View</Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div >
//     );
// }

// export default ProductList;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DepartmentFilter from './DepartmentFilter';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedDept, setSelectedDept] = useState(null);

    const fetchProducts = (deptId = null) => {
        const url = deptId
            ? `http ://localhost:3000/api/departments/${deptId}/products`
            : 'http://localhost:3000/api/products';

        axios.get(url)
            .then(res => {
                const data = deptId ? res.data.products : res.data;
                setProducts(data);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mt-4">
            <DepartmentFilter onSelect={(id) => {
                setSelectedDept(id);
                fetchProducts(id);
            }} />

            <h2>{selectedDept ? 'Filtered Products' : 'All Products'}</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">₹{product.retail_price}</p>
                                <Link to={`/product/${product.id}`} className="btn btn-primary">View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default ProductList;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.js';
import ProductDetail from './components/ProductDetail';
import DepartmentList from './components/DepartmentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import DepartmentProducts from './components/DepartmentProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/departments" element={<DepartmentList />} />
      <Route path="/departments/:id" element={<DepartmentProducts />} />
      <Route path="/departments/:id/:name" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;

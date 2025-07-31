import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DepartmentList() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/departments')
            .then(res => setDepartments(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Departments</h2>
            <ul className="list-group">
                {departments.map(dept => (
                    <li key={dept.id} className="list-group-item">
                        <Link to={`/departments/${dept.id}`}>{dept.name}</Link>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default DepartmentList;

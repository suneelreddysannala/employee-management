import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditEmployee from './editemployee'; 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editEmployeeId, setEditEmployeeId] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3001/employees'); 
                setEmployees(response.data); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchEmployees(); 
    }, []); 

    const handleEditClick = (id) => {
        setEditEmployeeId(id); 
    };

    const handleCloseEdit = () => {
        setEditEmployeeId(null); 
    };

    const handleUpdate = async () => {
       
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching employees: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">Employee List</h2>
            <Link to='/create' className="btn btn-primary w-100">
                    <h2>Create Employee</h2>           
            </Link>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Courses</th>
                        <th>Image</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course.join(', ')}</td> {}
                            <td>
                                {employee.image && (
                                    <img
                                        src={`http://localhost:3001/uploads/${employee.image}`} // 
                                        alt={employee.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} // 
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(employee._id)} className="btn btn-warning">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editEmployeeId && (
                <EditEmployee
                    employeeId={editEmployeeId}
                    onClose={handleCloseEdit}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default EmployeeList;

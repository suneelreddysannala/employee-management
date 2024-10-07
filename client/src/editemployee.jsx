import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const EditEmployee = ({ employeeId, onUpdate, onClose }) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Predefined courses
    const courses = ['BSC', 'MCA', 'Btech'];

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/employees/${employeeId}`);
                setEmployee(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'course') {
            // converting to the string
            const coursesArray = value.split(',').map(course => course.trim());
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [name]: coursesArray,
            }));
        } else {
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                [name]: value,
            }));
        }
    };

    const handleCourseChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            course: selectedOptions,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const employeeData = {
                ...employee,
                course: employee.course.join(', '), 
            };
            await axios.put(`http://localhost:3001/employees/${employeeId}`, employeeData);
            onUpdate(); 
            onClose(); 
        } catch (err) {
            console.error('Error updating employee:', err);
            setError(err.message);
        }
    };

    if (loading) return <div className="alert alert-info">Loading employee data...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobileNumber"
                        value={employee.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Designation</label>
                    <select
                        className="form-select"
                        name="designation"
                        value={employee.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="M"
                                checked={employee.gender === 'M'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label className="ms-3">
                            <input
                                type="radio"
                                name="gender"
                                value="F"
                                checked={employee.gender === 'F'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Courses</label>
                    <select
                        multiple
                        className="form-select"
                        name="course"
                        value={employee.course}
                        onChange={handleCourseChange}
                        required
                    >
                        {courses.map((course) => (
                            <option key={course} value={course}>
                                {course}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Employee</button>
            </form>
        </div>
    );
};

export default EditEmployee;

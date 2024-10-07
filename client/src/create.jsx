import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                // Add the course to the array if checked
                setFormData((prev) => ({
                    ...prev,
                    course: [...prev.course, value],
                }));
            } else {
                // Remove the course from the array if unchecked
                setFormData((prev) => ({
                    ...prev,
                    course: prev.course.filter((course) => course !== value),
                }));
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0], // Get the first file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobileNumber', formData.mobileNumber);
        form.append('designation', formData.designation);
        form.append('gender', formData.gender);
        form.append('course', JSON.stringify(formData.course)); 
        form.append('image', formData.image);

        try {
            await axios.post('http://localhost:3001/create-employee', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee created successfully!');
            
            
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('Failed to create employee');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Create Employee</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        className="form-control"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="designation" className="form-label">Designation</label>
                    <select
                        name="designation"
                        className="form-select"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <div>
                        <input
                            type="radio"
                            name="gender"
                            value="M"
                            onChange={handleChange}
                            required
                        /> Male
                        <input
                            type="radio"
                            name="gender"
                            value="F"
                            onChange={handleChange}
                            required
                        /> Female
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Course</label>
                    <div>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            onChange={handleChange}
                        /> MCA
                        <input
                            type="checkbox"
                            name="course"
                            value="BCS"
                            onChange={handleChange}
                        /> BCS
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            onChange={handleChange}
                        /> BSC
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        name="image"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;

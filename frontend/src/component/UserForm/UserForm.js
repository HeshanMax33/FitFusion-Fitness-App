import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './UserForm.css';
const UserForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(['']); // Array for phone numbers
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({}); // Object to hold field validation errors

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        if (!validateForm()) {
            return;
        }

        // Display confirmation alert before submitting the form
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to save this user profile?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Yes, save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                saveUserProfile(); // Call the function to save user profile if confirmed
            }
        });
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        }

        if (!address.trim()) {
            errors.address = 'Address is required';
            isValid = false;
        }

        if (phone.length === 0 || !phone.every(num => num.trim())) {
            errors.phone = 'At least one phone number is required';
            isValid = false;
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
            isValid = false;
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email format';
            isValid = false;
        }

        if (!age.trim()) {
            errors.age = 'Age is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const isValidEmail = (email) => {
        // Basic email format validation using regular expression
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const saveUserProfile = async () => {
        // Proceed with form submission...
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('address', address);
            formData.append('phone', JSON.stringify(phone)); // Convert array to string before sending
            formData.append('password', password);
            formData.append('email', email);
            formData.append('age', age);
            formData.append('file', file);

            const response = await axios.post('http://localhost:8080/api/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('User created:', response.data);
            setSuccessMessage('User created successfully!');
            setErrorMessage('');
            // Reset form
            setName('');
            setAddress('');
            setPhone(['']);
            setPassword('');
            setEmail('');
            setAge('');
            setFile(null);
        } catch (error) {
            console.error('Error creating user:', error);
            setErrorMessage('Failed to create user. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleAddPhone = () => {
        setPhone([...phone, '']); // Add a new empty string to the phone array
    };

    const handleRemovePhone = (index) => {
        const updatedPhone = [...phone];
        updatedPhone.splice(index, 1); // Remove the phone number at the specified index
        setPhone(updatedPhone);
    };

    return (
        <div className="container">
            {successMessage && <p style={{ color: 'green', textAlign: 'center' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                    {errors.name && <p className="error-msg">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" id="address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
                    {errors.address && <p className="error-msg">{errors.address}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    {phone.map((phoneNumber, index) => (
                        <div key={index}>
                            <input type="text" className="input-field" value={phoneNumber} onChange={(e) => {
                                const updatedPhone = [...phone];
                                updatedPhone[index] = e.target.value;
                                setPhone(updatedPhone);
                            }} />
                            <button type="button" className="button" onClick={() => handleRemovePhone(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" className="button" onClick={handleAddPhone}>Add Phone</button>
                    {errors.phone && <p className="error-msg">{errors.phone}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <p className="error-msg">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="error-msg">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="text" id="age" className="input-field" value={age} onChange={(e) => setAge(e.target.value)} />
                    {errors.age && <p className="error-msg">{errors.age}</p>}
                </div>
                <div className="form-group file-field">
                    <label htmlFor="file">Choose a file:</label>
                    <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button type="submit" className="button">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;

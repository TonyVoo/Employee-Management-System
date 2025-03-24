import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EmployeeComponent.css';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        department: '',
        position: '',
        joiningDate: '',
        profileImage: ''
    });

    const navigator = useNavigate();

    useEffect(() => { 
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhoneNumber(response.data.phoneNumber);
                setDateOfBirth(response.data.dateOfBirth);
                setAddress(response.data.address);
                setDepartment(response.data.department);
                setPosition(response.data.position);
                setJoiningDate(response.data.joiningDate);
                setProfileImage(response.data.profileImage);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { 
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                dateOfBirth, 
                address, 
                department, 
                position, 
                joiningDate, 
                profileImage 
            };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }   

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) { errorsCopy.firstName = 'First Name is required'; valid = false; } else errorsCopy.firstName = '';
        if (!lastName.trim()) { errorsCopy.lastName = 'Last Name is required'; valid = false; } else errorsCopy.lastName = '';
        if (!email.trim()) { errorsCopy.email = 'Email is required'; valid = false; } else errorsCopy.email = '';
        if (!phoneNumber.trim()) { errorsCopy.phoneNumber = 'Phone Number is required'; valid = false; } else errorsCopy.phoneNumber = '';
        if (!dateOfBirth.trim()) { errorsCopy.dateOfBirth = 'Date of Birth is required'; valid = false; } else errorsCopy.dateOfBirth = '';
        if (!address.trim()) { errorsCopy.address = 'Address is required'; valid = false; } else errorsCopy.address = '';
        if (!department.trim()) { errorsCopy.department = 'Department is required'; valid = false; } else errorsCopy.department = '';
        if (!position.trim()) { errorsCopy.position = 'Position is required'; valid = false; } else errorsCopy.position = '';
        if (!joiningDate.trim()) { errorsCopy.joiningDate = 'Joining Date is required'; valid = false; } else errorsCopy.joiningDate = '';
        errorsCopy.profileImage = '';

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        return id ? <h2 className='employee-title'>Update Employee</h2> : <h2 className='employee-title'>Add Employee</h2>;
    }

    return (
        <div className='employee-container'>
            <div className='row w-100'>
                <div className='employee-card col-md-6 offset-md-3'>
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Employee First Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`employee-form-input ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='employee-invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Employee Last Name</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`employee-form-input ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='employee-invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Employee Email</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`employee-form-input ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='employee-invalid-feedback'>{errors.email}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Phone Number</label>
                                <input 
                                    type='text' 
                                    className={`employee-form-input ${errors.phoneNumber ? 'is-invalid' : ''}`} 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                />
                                {errors.phoneNumber && <div className='employee-invalid-feedback'>{errors.phoneNumber}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Date of Birth</label>
                                <input 
                                    type='date' 
                                    className={`employee-form-input ${errors.dateOfBirth ? 'is-invalid' : ''}`} 
                                    value={dateOfBirth} 
                                    onChange={(e) => setDateOfBirth(e.target.value)} 
                                />
                                {errors.dateOfBirth && <div className='employee-invalid-feedback'>{errors.dateOfBirth}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Address</label>
                                <input 
                                    type='text' 
                                    className={`employee-form-input ${errors.address ? 'is-invalid' : ''}`} 
                                    value={address} 
                                    onChange={(e) => setAddress(e.target.value)} 
                                />
                                {errors.address && <div className='employee-invalid-feedback'>{errors.address}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Department</label>
                                <input 
                                    type='text' 
                                    className={`employee-form-input ${errors.department ? 'is-invalid' : ''}`} 
                                    value={department} 
                                    onChange={(e) => setDepartment(e.target.value)} 
                                />
                                {errors.department && <div className='employee-invalid-feedback'>{errors.department}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Position</label>
                                <input 
                                    type='text' 
                                    className={`employee-form-input ${errors.position ? 'is-invalid' : ''}`} 
                                    value={position} 
                                    onChange={(e) => setPosition(e.target.value)} 
                                />
                                {errors.position && <div className='employee-invalid-feedback'>{errors.position}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Joining Date</label>
                                <input 
                                    type='date' 
                                    className={`employee-form-input ${errors.joiningDate ? 'is-invalid' : ''}`} 
                                    value={joiningDate} 
                                    onChange={(e) => setJoiningDate(e.target.value)} 
                                />
                                {errors.joiningDate && <div className='employee-invalid-feedback'>{errors.joiningDate}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='employee-form-label'>Profile Image URL</label>
                                <input 
                                    type='text' 
                                    placeholder='Enter image URL'
                                    className={`employee-form-input ${errors.profileImage ? 'is-invalid' : ''}`} 
                                    value={profileImage} 
                                    onChange={(e) => setProfileImage(e.target.value)} 
                                />
                                {errors.profileImage && <div className='employee-invalid-feedback'>{errors.profileImage}</div>}
                            </div>

                            <button className='employee-btn-submit' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeComponent;
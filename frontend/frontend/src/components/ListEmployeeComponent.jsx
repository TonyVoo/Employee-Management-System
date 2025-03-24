import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import '../styles/ListEmployeeComponent.css';

function ListEmployeeComponent() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        setLoading(true);
        listEmployees().then((response) => {
            setEmployees(response.data);
            setFilteredEmployees(response.data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
            setLoading(false);
        });
    }

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = employees.filter(employee => 
            employee.firstName.toLowerCase().includes(term) ||
            employee.lastName.toLowerCase().includes(term) ||
            employee.email.toLowerCase().includes(term) ||
            (employee.joiningDate && employee.joiningDate.toLowerCase().includes(term))
        );
        setFilteredEmployees(filtered);
    };

    function addEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id).then(() => {
                getAllEmployee();
            }).catch(error => {
                console.error(error);
            });
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or joining date..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ maxWidth: '300px' }}
                />
                <button 
                    className='btn btn-primary'
                    onClick={addEmployee}
                >
                    <FaPlus />
                </button>
            </div>

            {loading ? (
                <p className="text-center">Loading employees...</p>
            ) : employees.length === 0 ? (
                <p className="text-center">No employees found.</p>
            ) : (
                <table className='table table-striped table-bordered'><thead><tr><th>ID</th><th>Profile Image</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Date of Birth</th><th>Address</th><th>Department</th><th>Position</th><th>Joining Date</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredEmployees.map(employee => (
                            <tr key={employee.id}><td>{employee.id}</td><td>
                                    {employee.profileImage ? (
                                        <img 
                                            src={employee.profileImage} 
                                            alt={`${employee.firstName} ${employee.lastName}`} 
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td><td>{employee.firstName}</td><td>{employee.lastName}</td><td>{employee.email}</td><td>{employee.phoneNumber}</td><td>{employee.dateOfBirth}</td><td>{employee.address}</td><td>{employee.department}</td><td>{employee.position}</td><td>{employee.joiningDate}</td><td className=''>
                                    <div className="action-buttons">
                                        <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}><MdModeEdit /></button>
                                        <button 
                                            className='btn btn-danger' 
                                            onClick={() => removeEmployee(employee.id)}
                                        ><MdDelete /></button>
                                    </div>
                                </td></tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListEmployeeComponent;
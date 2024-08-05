import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ManageUsers.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [role, setRole] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin_users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users: ", error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/admin_users', { email, password, fullname, role });
            fetchUsers();
            setEmail('');
            setPassword('');
            setFullname('');
            setRole('');
        } catch (error) {
            console.error("Error creating user: ", error);
        }
    };

    const handleEditUser = (user) => {
        setEditId(user.id);
        setEmail(user.email);
        setFullname(user.fullname);
        setRole(user.role);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const updateUser = {};
            if (email) updateUser.email = email;
            if (fullname) updateUser.fullname = fullname;
            if (role) updateUser.role = role;
            if (password) updateUser.password = password;

            await axios.put(`http://localhost:8080/admin_users/${editId}`, updateUser);
            setEditId(null);
            fetchUsers();
            setEmail('');
            setPassword('');
            setFullname('');
            setRole('');
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin_users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user: ", error);
        }
    };

    return (
        <div className="manage-users">
            <h2>Manage Users</h2>
            <form onSubmit={editId ? handleUpdateUser : handleCreateUser}>
                <h2>{editId ? 'Edit User' : 'Add User'}</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                </select>
                <button type="submit">{editId ? 'Update' : 'Create'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.fullname}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;

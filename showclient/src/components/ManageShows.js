import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/AdminDashboard.css';

const ManageShows = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/shows')
            .then(response => {
                setShows(response.data);
            })
            .catch(error => {
                console.error('Error fetching shows:', error);
            });
    }, []);

    const handleDelete = (showId) => {
        axios.delete(`http://localhost:8080/api/admin/shows/${showId}`)
            .then(() => {
                setShows(shows.filter(show => show.id !== showId));
            })
            .catch(error => {
                console.error('Error deleting show:', error);
            });
    };

    return (
        <div className="admin-section">
            <h3>Manage Shows</h3>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>
                        {show.name}
                        <button onClick={() => handleDelete(show.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageShows;

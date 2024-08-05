import React, { useState } from 'react';
import axios from 'axios';
import './css/show.css'; 

const SearchShows = () => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [network, setNetwork] = useState('');
    const [shows, setShows] = useState([]);

    const handleSearch = () => {
        axios.get('http://localhost:8080/api/shows/search', {
            params: {
                name: name,
                genre: genre,
                network: network
            }
        }).then(response => {
            setShows(response.data);
        }).catch(error => {
            console.error('Error searching shows:', error);
        });
    };

    return (
        <div className="search-shows">
            <input
                type="text"
                placeholder="Search by name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Search by genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Search by network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>

            <div className="shows-list">
                {shows.map(show => (
                    <div key={show.id} className="show-item">
                        <h3>{show.name}</h3>
                        <p>Genre: {show.genre}</p>
                        <p>Network: {show.network}</p>
                        <p>Description: {show.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchShows;

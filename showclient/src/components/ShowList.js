import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import showService from '../services/showService';
import './css/ShowList.css';
import AiringSchedule from './AiringSchedule';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');

  const navigate = useNavigate(); // This is used to programmatically navigate

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data in localStorage
    navigate('/login'); // Redirect to the login page or wherever needed
  };

  useEffect(() => {
    showService.getShows().then(
      response => {
        setShows(response.data);
        setFilteredShows(response.data);
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const filtered = shows.filter(show => {
      if (filterType === 'name') {
        return show.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterType === 'genre') {
        return show.genre.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (filterType === 'network') {
        return show.network.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return false;
      }
    });

    setFilteredShows(filtered);
  }, [searchTerm, filterType, shows]);

  // Function to decode base64 image
  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="show-list-container">
      <div className="search-filters">
        <input
          type="text"
          placeholder={`Search by ${filterType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="name">Name</option>
          <option value="genre">Genre</option>
          <option value="network">Network</option>
        </select>
        <button onClick={handleLogout} className="logout-button">Logout</button> {/* Logout button */}
      </div>

      <AiringSchedule />

      <section className="photo-gallery">
        {/* Add your images here */}
      </section>

      <div className="shows-list">
        {filteredShows.map(show => (
          <div key={show.id} className="show-item">
            <Link to={`/shows/${show.id}`}>
              <img
                src={decodeBase64Image(show.image)}
                alt={show.name}
                className="show-image"
              />
            </Link>
            <h3>{show.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;

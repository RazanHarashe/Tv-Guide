import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import showService from '../services/showService';
import './css/ShowList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    showService.getShows().then(
      response => {
        setShows(response.data);
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="show-list-container">
      <div className="show-list-header">
      <button onClick={() => navigate('/searchshow')} className="search-button1">
        Go to Search Page
      </button>
      </div>
      <section className="photo-gallery">
                <img src="/img/harry.jpg" alt="harry potter show" />
                <img src="/img/stranger.jpg" alt="stranger thing show" />
                <img src="/img/friends.jpg" alt="friends show" />
                <img src="/img/scream.jpg" alt="scream show" />
                <img src="/img/breacking.jpg" alt="breacking bad show" />
                <img src="/img/dead.jpg" alt="walking dead show" />
                <img src="/img/wednesday.jpg" alt="wednesday show" />
                <img src="/img/peaky blinder.jpg" alt="hill house show" />
                <img src="/img/queens.jpg" alt="hill house show" />
                <img src="/img/emily.jpg" alt="hill house show" />
                <img src="/img/game.jpg" alt="hill house show" />
                <img src="/img/hill-house.jpg" alt="hill house show" />
            </section>
      {shows.map(show => (
        <div key={show.id} className="show-item">
          <Link to={`/shows/${show.id}`}>
            <img src={show.image} alt={show.name} className="show-image" />
          </Link>
          <h3>{show.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ShowList;

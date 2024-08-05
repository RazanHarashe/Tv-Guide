import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showService from '../services/showService';
import './css/ShowDetails.css';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    showService.getShowById(id).then(
      response => {
        setShow(response.data);
      },
      error => {
        console.error(error);
      }
    );
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-details-container">
      <img src={show.image} alt={show.name} className="show-image" />
      <h2>{show.name}</h2>
      <p>{show.description}</p>
      <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
      <p><strong>Rating:</strong> {show.rating}</p>
    </div>
  );
};

export default ShowDetails;

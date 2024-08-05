import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showService from '../services/showService';
import './css/ShowDetails.css';

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false); // State to toggle edit mode
  const [selectedReview, setSelectedReview] = useState(null); // State to hold selected review for editing

  useEffect(() => {
    loadShowDetails();
    loadReviews();
  }, [id]);

  const loadShowDetails = () => {
    showService.getShowById(id).then(
      response => {
        setShow(response.data.show);
        setAverageRating(response.data.averageRating);
      },
      error => {
        console.error(error);
      }
    );
  };

  const loadReviews = () => {
    showService.getShowReviews(id).then(
      response => {
        setReviews(response.data);
      },
      error => {
        console.error(error);
      }
    );
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewReview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRatingChange = ratingValue => {
    setNewReview(prevState => ({
      ...prevState,
      rating: ratingValue
    }));
  };

  const handleAddReview = () => {
    showService.addShowReview(id, newReview).then(
      response => {
        setNewReview({ rating: 0, comment: '' });
        loadReviews();
        loadShowDetails(); // Reload show details to update average rating
      },
      error => {
        console.error('Error adding review:', error);
      }
    );
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setEditMode(true);
  };

  const handleUpdateReview = () => {
    showService.editShowReview(selectedReview.id, selectedReview).then(
      response => {
        setEditMode(false);
        setSelectedReview(null);
        loadReviews();
        loadShowDetails(); // Reload show details to update average rating
      },
      error => {
        console.error('Error updating review:', error);
      }
    );
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedReview(null);
  };

  // Function to decode base64 image
  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleDeleteReview = reviewId => {
    showService.deleteShowReview(reviewId).then(
      response => {
        loadReviews();
        loadShowDetails(); // Reload show details to update average rating
      },
      error => {
        console.error('Error deleting review:', error);
      }
    );
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="show-details-container">
      <h2>{show.name}</h2>
      <img src={decodeBase64Image(show.image)} alt={show.name} className="show-details-image" />
      <p><strong>Genre:</strong> {show.genre}</p>
      <p><strong>Network:</strong> {show.network}</p>
      <p><strong>Description:</strong> {show.description}</p>
      <p><strong>Average Rating:</strong> {averageRating.toFixed(1)}</p>

      {/* Add form to add a new review */}
      {!editMode && (
        <div className="add-review-form">
          <h3>Add a Review</h3>
          <div>
            <label>Rating:</label>
            <select name="rating" value={newReview.rating} onChange={handleInputChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label>Comment:</label>
            <textarea name="comment" value={newReview.comment} onChange={handleInputChange} />
          </div>
          <button onClick={handleAddReview}>Submit Review</button>
        </div>
      )}

      {/* Display existing reviews */}
      <div className="reviews-list">
        <h3>Reviews</h3>
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <p><strong>User:</strong> {review.user} (Rating: {review.rating})</p>
            <p>{review.comment}</p>
            {!editMode && (
              <div>
                <button onClick={() => handleEditReview(review)}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit review form */}
      {editMode && selectedReview && (
        <div className="edit-review-form">
          <h3>Edit Review</h3>
          <div>
            <label>Rating:</label>
            <select name="rating" value={selectedReview.rating} onChange={(e) => setSelectedReview({...selectedReview, rating: e.target.value})}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label>Comment:</label>
            <textarea name="comment" value={selectedReview.comment} onChange={(e) => setSelectedReview({...selectedReview, comment: e.target.value})} />
          </div>
          <button onClick={handleUpdateReview}>Update Review</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ManageReviews.css';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ showId: '', rating: '', comment: '' });
    const [editingReview, setEditingReview] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/shows/reviews');
            console.log('API response:', response.data); // Add console log
            if (Array.isArray(response.data)) {
                setReviews(response.data);
            } else {
                console.error('Unexpected API response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/shows/reviews/${id}`);
            fetchReviews();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSaveReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/shows/reviews/${newReview.showId}`, newReview);
            setNewReview({ showId: '', rating: '', comment: '' });
            fetchReviews();
        } catch (error) {
            console.error('Error saving review:', error);
        }
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
    };

    const handleUpdateReview = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/shows/reviews/${editingReview.id}`, editingReview);
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingReview({ ...editingReview, [name]: value });
    };

    return (
        <div className="manage-reviews">
            <h2>Manage Reviews</h2>
            <form onSubmit={handleSaveReview}>
                <input type="text" name="showId" value={newReview.showId} onChange={handleInputChange} placeholder="Show ID" required />
                <input type="number" name="rating" value={newReview.rating} onChange={handleInputChange} placeholder="Rating" required />
                <textarea name="comment" value={newReview.comment} onChange={handleInputChange} placeholder="Comment" required></textarea>
                <button type="submit">Add Review</button>
            </form>
            {editingReview && (
                <form onSubmit={handleUpdateReview} className="edit-form">
                    <h3>Edit Review</h3>
                    <input type="number" name="rating" value={editingReview.rating} onChange={handleEditInputChange} placeholder="Rating" required />
                    <textarea name="comment" value={editingReview.comment} onChange={handleEditInputChange} placeholder="Comment" required></textarea>
                    <button type="submit">Update Review</button>
                    <button type="button" onClick={() => setEditingReview(null)}>Cancel</button>
                </form>
            )}
            <table className="review-table">
                <thead>
                    <tr>
                        <th>Show ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <tr key={review.id}>
                                <td>{review.showId}</td>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                                <td>
                                    <button onClick={() => handleEditReview(review)}>Edit</button>
                                    <button onClick={() => handleDelete(review.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No reviews available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageReviews;

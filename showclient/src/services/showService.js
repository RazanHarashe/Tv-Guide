import axios from 'axios';

const API_URL = 'http://localhost:8080/shows';

const showService = {
  getShows: () => axios.get(API_URL),
  getShowById: (id) => axios.get(`${API_URL}/${id}`),
  addShow: (data) => axios.post(API_URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  deleteShow: (id) => axios.delete(`${API_URL}/${id}`),
  addAiringSchedule: (showId, airingSchedule) => axios.post(`${API_URL}/airing-schedule/${showId}`, airingSchedule),

  // Functions for managing reviews
  getShowReviews: (showId) => axios.get(`${API_URL}/reviews/${showId}`),

  addShowReview: (showId, reviewData) => axios.post(`${API_URL}/reviews/${showId}`, reviewData),

  editShowReview: (reviewId, reviewData) => axios.put(`${API_URL}/reviews/${reviewId}`, reviewData),

  deleteShowReview: (reviewId) => axios.delete(`${API_URL}/reviews/${reviewId}`),

  getAllAiringSchedules: () => axios.get(`${API_URL}/airing-schedule`)
};

export default showService;

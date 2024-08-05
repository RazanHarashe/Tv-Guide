import axios from 'axios';

const API_URL = 'http://localhost:8080/api/shows';

const showService = {
  getShows: () => axios.get(API_URL),
  getShowById: (id) => axios.get(`${API_URL}/${id}`),
};

export default showService;

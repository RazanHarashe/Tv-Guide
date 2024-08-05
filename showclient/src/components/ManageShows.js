import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ManageShows.css';

const ManageShows = () => {
    const [shows, setShows] = useState([]);
    const [newShow, setNewShow] = useState({ name: '', genre: '', network: '', description: '', image: null });
    const [editingShow, setEditingShow] = useState(null);
    const [airingSchedules, setAiringSchedules] = useState([]);
    const [selectedShowId, setSelectedShowId] = useState(null);
    const [newAiringSchedule, setNewAiringSchedule] = useState({ airDate: '' });

    useEffect(() => {
        fetchShows();
    }, []);

    const fetchShows = async () => {
        try {
            const response = await axios.get('http://localhost:8080/shows');
            if (Array.isArray(response.data)) {
                setShows(response.data);
            } else {
                console.error('Unexpected API response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching shows:', error);
        }
    };

    const fetchAiringSchedule = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/shows/airing-schedule/${id}`);
            setAiringSchedules(response.data);
        } catch (error) {
            console.error('Error fetching airing schedule:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/shows/${id}`);
            fetchShows();
        } catch (error) {
            console.error('Error deleting show:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShow({ ...newShow, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setNewShow({ ...newShow, image: file });
    };

    const handleSaveShow = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', newShow.name);
            formData.append('genre', newShow.genre);
            formData.append('network', newShow.network);
            formData.append('description', newShow.description);
            formData.append('image', newShow.image);

            await axios.post('http://localhost:8080/shows', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setNewShow({ name: '', genre: '', network: '', description: '', image: null });
            fetchShows();
        } catch (error) {
            console.error('Error saving show:', error);
        }
    };

    const handleEditShow = (show) => {
        setEditingShow(show);
    };

    const handleUpdateShow = async (e) => {
                e.preventDefault();
                try {
                    await axios.put(`http://localhost:8080/shows/${editingShow.id}`, editingShow);
                    setEditingShow(null);
                    fetchShows();
                } catch (error) {
                    console.error('Error updating show:', error);
                }
            };
    
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingShow({ ...editingShow, [name]: value });
    };

    const handleAddAiringSchedule = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/shows/airing-schedule/${selectedShowId}`, newAiringSchedule);
            setNewAiringSchedule({ airDate: '' });
            fetchAiringSchedule(selectedShowId);
        } catch (error) {
            console.error('Error adding airing schedule:', error);
        }
    };

      // Function to decode base64 image
  const decodeBase64Image = (base64String) => {
    return `data:image/jpeg;base64,${base64String}`;
  };


    return (
        <div className="manage-shows">
            <h2>Manage Shows</h2>
            <form onSubmit={handleSaveShow}>
                <input type="text" name="name" value={newShow.name} onChange={handleInputChange} placeholder="Show Name" required />
                <input type="text" name="genre" value={newShow.genre} onChange={handleInputChange} placeholder="Genre" required />
                <input type="text" name="network" value={newShow.network} onChange={handleInputChange} placeholder="Network" required />
                <textarea name="description" value={newShow.description} onChange={handleInputChange} placeholder="Description" required></textarea>
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Add Show</button>
            </form>
            {editingShow && (
                <form onSubmit={handleUpdateShow} className="edit-form">
                    <h3>Edit Show</h3>
                    <input type="text" name="name" value={editingShow.name} onChange={handleEditInputChange} placeholder="Show Name" required />
                    <input type="text" name="genre" value={editingShow.genre} onChange={handleEditInputChange} placeholder="Genre" required />
                    <input type="text" name="network" value={editingShow.network} onChange={handleEditInputChange} placeholder="Network" required />
                    <textarea name="description" value={editingShow.description} onChange={handleEditInputChange} placeholder="Description" required></textarea>
                    {/* <input type="file" name="image" onChange={handleImageChange} /> */}
                    <button type="submit">Update Show</button>
                    <button type="button" onClick={() => setEditingShow(null)}>Cancel</button>
                </form>
            )}
            <table className="show-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Network</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.length > 0 ? (
                        shows.map(show => (
                            <tr key={show.id}>
                                <td>{show.name}</td>
                                <td>{show.genre}</td>
                                <td>{show.network}</td>
                                <td>{show.description}</td>
                                <td>{show.image && <img src={decodeBase64Image(show.image)} alt={show.name} className="show-image" />}</td>
                                <td>
                                    <button onClick={() => handleEditShow(show)}>Edit</button>
                                    <button onClick={() => handleDelete(show.id)}>Delete</button>
                                    <button onClick={() => {
                                        setSelectedShowId(show.id);
                                        fetchAiringSchedule(show.id);
                                    }}>View Airing Schedule</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No shows available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {selectedShowId && (
                <div>
                    <h3 className='airing'>Airing Schedule</h3>
                    <form onSubmit={handleAddAiringSchedule}>
                        <input type="date" name="airDate" value={newAiringSchedule.airDate} onChange={(e) => setNewAiringSchedule({ airDate: e.target.value })} required />
                        <input type="number" name="episodeNumber" value={newAiringSchedule.episodeNumber} onChange={(e) => setNewAiringSchedule({ ...newAiringSchedule, episodeNumber: e.target.value })} placeholder="Episode Number" required />
                        <button type="submit">Add Airing Schedule</button>
                    </form>
                    <table className="airing-schedule-table">
                        <thead>
                            <tr>
                                <th>Air Date</th>
                                <th>Episode Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {airingSchedules.length > 0 ? (
                                airingSchedules.map(schedule => (
                                    <tr key={schedule.id}>
                                        <td>{new Date(schedule.airDate).toLocaleDateString()}</td>
                                        <td>{schedule.episodeNumber}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No airing schedules available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageShows;


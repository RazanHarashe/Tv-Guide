// src/components/AiringSchedule.js
import React, { useEffect, useState } from 'react';
import showService from '../services/showService';
import './css/AiringSchedule.css';

const AiringSchedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    showService.getAllAiringSchedules().then(
      response => {
        console.log('Airing Schedules Response:', response.data); // Log response data

        // Sort schedules by air date (assuming airDate is a valid date string or timestamp)
        const sortedSchedules = response.data.sort((a, b) => new Date(a.airDate) - new Date(b.airDate));

        setSchedules(sortedSchedules);
      },
      error => {
        console.error('Error fetching airing schedules:', error); // Log any error
      }
    );
  }, []);

  return (
    <div className="airing-schedule-container">
      <h2>Airing Schedules</h2>
      <div className="airing-schedule-list">
        {schedules.map(schedule => (
          <div key={schedule.id} className="airing-schedule-item">
            <div className="airing-schedule-details">
              <div className="show-name">{schedule.showName}</div>
              <div className="episode-number">EP{schedule.episodeNumber}</div>
              <div className="air-date">{new Date(schedule.airDate).toDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiringSchedule;

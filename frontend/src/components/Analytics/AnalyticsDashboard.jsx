import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = ({ userId }) => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState({});

  useEffect(() => {
    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/analytics/user/${userId}`);
      const data = await response.json();
      setAnalytics(data);
      
      // Count event types
      const types = {};
      data.forEach(event => {
        types[event.eventType] = (types[event.eventType] || 0) + 1;
      });
      setEventTypes(types);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType, eventData) => {
    try {
      await fetch('http://localhost:8080/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': 'user-ip'
        },
        body: JSON.stringify({
          userId: userId,
          eventType: eventType,
          eventData: eventData
        })
      });
      fetchAnalytics();
    } catch (err) {
      console.error('Error tracking event:', err);
    }
  };

  return (
    <div className="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      
      <div className="stats-container">
        {Object.entries(eventTypes).map(([type, count]) => (
          <div key={type} className="stat-card">
            <h3>{type}</h3>
            <p className="stat-value">{count}</p>
          </div>
        ))}
      </div>

      <div className="events-section">
        <h3>Recent Events</h3>
        {loading ? (
          <p>Loading events...</p>
        ) : analytics.length === 0 ? (
          <p>No events recorded</p>
        ) : (
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Data</th>
                <th>IP Address</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {analytics.slice(0, 10).map(event => (
                <tr key={event.id}>
                  <td>{event.eventType}</td>
                  <td>{event.eventData || '-'}</td>
                  <td>{event.ipAddress}</td>
                  <td>{new Date(event.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="test-section">
        <h3>Test Tracking</h3>
        <button onClick={() => trackEvent('PAGE_VIEW', 'dashboard')}>Track Page View</button>
        <button onClick={() => trackEvent('BUTTON_CLICK', 'test-button')}>Track Button Click</button>
        <button onClick={() => trackEvent('FORM_SUBMIT', 'user-form')}>Track Form Submit</button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

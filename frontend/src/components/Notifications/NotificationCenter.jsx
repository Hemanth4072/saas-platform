import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';

const NotificationCenter = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [userId]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/user/${userId}`);
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/user/${userId}/unread-count`);
      const data = await response.json();
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3>Notifications {unreadCount > 0 && <span className="badge">{unreadCount}</span>}</h3>
      </div>
      
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p className="empty-state">No notifications</p>
      ) : (
        <div className="notification-list">
          {notifications.map(notif => (
            <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'} ${notif.type.toLowerCase()}`}>
              <div className="notification-content">
                <h4>{notif.title}</h4>
                <p>{notif.message}</p>
                <small>{new Date(notif.createdAt).toLocaleString()}</small>
              </div>
              {!notif.read && (
                <button onClick={() => markAsRead(notif.id)} className="mark-read-btn">
                  ✓
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;

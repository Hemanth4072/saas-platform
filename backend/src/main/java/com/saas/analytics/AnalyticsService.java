package com.saas.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalyticsService {
    @Autowired
    private AnalyticsRepository analyticsRepository;

    public Analytics trackEvent(Long userId, String eventType, String eventData, String ipAddress) {
        Analytics analytics = new Analytics();
        analytics.setUserId(userId);
        analytics.setEventType(eventType);
        analytics.setEventData(eventData);
        analytics.setIpAddress(ipAddress);
        return analyticsRepository.save(analytics);
    }

    public List<Analytics> getUserAnalytics(Long userId) {
        return analyticsRepository.findByUserId(userId);
    }

    public List<Analytics> getEventsByType(String eventType) {
        return analyticsRepository.findByEventType(eventType);
    }

    public List<Analytics> getAnalyticsByDateRange(LocalDateTime start, LocalDateTime end) {
        return analyticsRepository.findByTimestampBetween(start, end);
    }
}

package com.saas.analytics;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {
    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/track")
    public ResponseEntity<?> trackEvent(@RequestBody AnalyticsTrackRequest request,
                                        @RequestHeader("X-Forwarded-For") String ipAddress) {
        Analytics analytics = analyticsService.trackEvent(
            request.getUserId(),
            request.getEventType(),
            request.getEventData(),
            ipAddress
        );
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAnalytics(@PathVariable Long userId) {
        List<Analytics> analytics = analyticsService.getUserAnalytics(userId);
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/event/{eventType}")
    public ResponseEntity<?> getEventsByType(@PathVariable String eventType) {
        List<Analytics> analytics = analyticsService.getEventsByType(eventType);
        return ResponseEntity.ok(analytics);
    }
}

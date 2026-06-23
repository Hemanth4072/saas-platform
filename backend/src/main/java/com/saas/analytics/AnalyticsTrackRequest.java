package com.saas.analytics;

import lombok.Data;

@Data
public class AnalyticsTrackRequest {
    private Long userId;
    private String eventType;
    private String eventData;
}

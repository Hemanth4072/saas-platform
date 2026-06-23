package com.saas.notifications;

import lombok.Data;

@Data
public class NotificationRequest {
    private Long userId;
    private String title;
    private String message;
    private String type;
}

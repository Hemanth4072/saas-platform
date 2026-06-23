package com.saas.analytics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    List<Analytics> findByUserId(Long userId);
    List<Analytics> findByEventType(String eventType);
    List<Analytics> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
}

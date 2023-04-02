package site.carborn.mapping.company;

import java.time.LocalDateTime;

public interface InspectorReviewMapping {

    String getAccountId();

    String getContent();

    int getPoint();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}

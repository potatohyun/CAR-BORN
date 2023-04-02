package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface UserCommunityListMapping {
    int getId();
    String getAccountName();
    String getTitle();
    String getContent();
    LocalDateTime getRegDt();
    LocalDateTime getUptDt();
    int getViews();
}

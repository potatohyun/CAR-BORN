package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface UserCommunityCommentListMapping {
    int getId();
    String getAccountId();
    String getAccountName();

    String getContent();
    LocalDateTime getRegDt();
    LocalDateTime getUptDt();

}

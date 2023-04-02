package site.carborn.mapping.user;


import java.time.LocalDateTime;

public interface UserInspectResultListMapping {
    int getId();
    int getInspectBookId();
    String getContent();
    int getMileage();

    String getInspectBookInspectorAccountName();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    LocalDateTime getInspectDt();

    String getMetadataUri();

    LocalDateTime getRegDt();
}

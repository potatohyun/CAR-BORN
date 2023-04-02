package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface InspectResultGetDetailMapping {

    int getId();
    //차량모델
    String getInspectBookCarModelNm();

    //정비소이름
    String getInspectBookInspectorAccountName();

    String getContent();

    int getMileage();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    int getInspectPrice();

    LocalDateTime getInspectDt();

    String getMetadataUri();

    LocalDateTime getRegDt();
}

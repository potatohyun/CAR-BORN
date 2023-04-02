package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface RepairResultGetDetailMapping {

    int getId();

    //차량모델
    String getRepairBookCarModelNm();

    //정비소이름
    String getRepairBookRepairShopAccountName();

    String getContent();

    int getMileage();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    int getRepairPrice();

    LocalDateTime getRepairDt();

    String getMetadataUri();

    LocalDateTime getRegDt();

}

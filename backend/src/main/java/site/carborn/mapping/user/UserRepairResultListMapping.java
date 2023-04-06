package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface UserRepairResultListMapping {
    int getId();

    //차량모델
    String getRepairBookCarModelNm();

    String getRepairBookRepairShopAccountName();

    //연식
    String getRepairBookCarModelYear();

    String getContent();

    //주행거리
    int getMileage();

    //차량번호
    String getRepairBookCarRegNm();

    //의뢰자
    String getRepairBookAccountName();

    //아이디
    String getRepairBookAccountId();

    //정비받은 날짜
    LocalDateTime getRepairDt();

    String getMetadataUri();

    String getBeforeImgNm();

    String getAfterImgNm();

    String getReceiptImgNm();

    //상세정보조회(정비예약상태)
    int getRepairBookBookStatus();

}

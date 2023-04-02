package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserRepairBookListMapping {
    int getId();

    //차량모델
    String getCarModelNm();

    //연식
    String getCarModelYear();

    //주행거리
    int getCarMileage();

    //차량번호
    String getCarRegNm();

    //상태정보조회(정비예약상태)
    int getBookStatus();

    //정비예약일정
    LocalDate getBookDt();

    // 정비업체이름
    String getRepairShopAccountName();

    //메이커
    String getCarMaker();
}

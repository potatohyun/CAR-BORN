package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserRepairBookDetailMapping {
    int getId();

    //유저 차 정보
    int getCarId();

    //기업 정보
    int getRepairShopId();

    String getRepairShopAddress();

    String getRepairShopAccountName();

    String getRepairShopAccountPhoneNo();

    //유저 예약 정보
    String getAccountId();

    String getContent();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}

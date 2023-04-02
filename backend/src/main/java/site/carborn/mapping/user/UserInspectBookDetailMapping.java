package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface UserInspectBookDetailMapping {
    int getId();

    // 유저 차정보
    int getCarId();

    //기업 정보
    int getInspectorId();

    String getInspectorAddress();

    String getInspectorAccountName();

    String getInspectorAccountPhoneNo();

    //유저예약 정보
    String getAccountId();

    String getContent();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}

package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface RepairBookGetDetailMapping {

    int getId();

    String getCarModelNm();

    String getCarRegNm();

    String getCarVin();

    String getAccountId();

    String getAccountName();

    String getAccountPhoneNo();

    String getContent();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}

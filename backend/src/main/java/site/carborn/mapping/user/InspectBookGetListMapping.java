package site.carborn.mapping.user;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface InspectBookGetListMapping {

    int getId();

    String getCarModelNm();

    String getCarRegNm();

    String getCarVin();

    String getAccountId();

    String getAccountPhoneNo();

    int getBookStatus();

    LocalDate getBookDt();

    LocalDateTime getRegDt();

}

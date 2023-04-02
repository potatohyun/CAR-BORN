package site.carborn.mapping.car;

import java.time.LocalDateTime;

public interface CarGetDetailMapping {

    int getId();

    String getWalletHash();

    String getMaker();

    String getModelNm();

    String getModelYear();

    String getRegNm();

    String getVin();

    int getMileage();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();

}

package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface CarSaleBookGetListMapping {

    int getId();

    String getCarSaleCarMaker();

    String getCarSaleCarModelNm();

    String getCarSaleCarModelYear();

    String getCarSaleCarRegNm();

    int getCarSaleCarMileage();

    int getCarSalePrice();

    int getBookStatus();

    LocalDateTime getRegDt();

    LocalDateTime getUptDt();
}

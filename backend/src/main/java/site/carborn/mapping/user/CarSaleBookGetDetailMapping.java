package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface CarSaleBookGetDetailMapping {

    int getCarSaleId();

    String getCarSaleAccountId();

    int getCarSaleCarId();

    String getCarSaleCarMaker();

    String getCarSaleCarModelNm();

    String getCarSaleCarModelYear();

    String getCarSaleCarRegNm();

    int getCarSaleCarMileage();

    String getCarSaleContent();

    int getCarSalePrice();

    int getCarSaleSaleStatus();

    LocalDateTime getCarSaleRegDt();

    LocalDateTime getCarSaleUptDt();

    int getBookStatus();
}

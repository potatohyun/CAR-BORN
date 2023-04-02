package site.carborn.mapping.car;

import java.time.LocalDateTime;

public interface CarTradeGetListMapping {

    int getId();

    int getCarId();

    String getBuyerAccountId();

    String getSellerAccountId();

    int getPrice();

    String getMetadataUri();

    LocalDateTime getRegDt();
}

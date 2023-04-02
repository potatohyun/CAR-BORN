package site.carborn.mapping.user;

import java.time.LocalDateTime;

public interface InspectResultGetListMapping {

    int getId();

    int getMileage();

    int getInspectPrice();

    LocalDateTime getInspectDt();

    String getMetadataUri();

    LocalDateTime getRegDt();

}
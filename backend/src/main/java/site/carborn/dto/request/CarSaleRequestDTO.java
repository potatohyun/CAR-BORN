package site.carborn.dto.request;

import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarSaleRequestDTO {
    private int id;
    private String accountId;
    private int carId;
    private String maker;
    private String modelNm;
    private String modelYear;
    private int mileage;
    private String content;
    private int price;
    private byte saleStatus;
    private Timestamp regDt;
    private Timestamp uptDt;
    private String imgNm;
}

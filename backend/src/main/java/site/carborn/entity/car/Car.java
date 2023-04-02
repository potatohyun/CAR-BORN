package site.carborn.entity.car;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR")
@Getter
@Setter
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @Column(length = 200)
    private String walletHash;

    @Column(length = 50)
    private String maker;

    @Column(length = 200)
    private String modelNm;

    @Column(length = 50)
    private String modelYear;

    @Column(length = 50)
    private String regNm;

    @Column(length = 200)
    private String vin;

    private int mileage;

    @Column(length = 200)
    private String contractHash;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;

    public static Car copy(Car car) {
        Car c = new Car();
        BeanUtils.copyProperties(car, c);
        return c;
    }
}

package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_SALE")
@Getter
@Setter
@NoArgsConstructor
public class CarSale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    private String content;

    private int price;

    private int saleStatus;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}

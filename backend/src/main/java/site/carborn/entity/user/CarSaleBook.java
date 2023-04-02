package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_SALE_BOOK")
@Getter
@Setter
@NoArgsConstructor
public class CarSaleBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_SALE_ID")
    private CarSale carSale;

    private int bookStatus;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}

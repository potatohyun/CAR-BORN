package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.*;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.RepairShop;
import site.carborn.entity.account.Account;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_BOOK")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RepairBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REPAIR_SHOP_ID")
    private RepairShop repairShop;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private int bookStatus;

    private LocalDate bookDt;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;

}

package site.carborn.entity.company;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_SHOP_REVIEW")
@Getter
@Setter
@NoArgsConstructor
public class RepairShopReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REPAIR_SHOP_ID")
    private RepairShop repairShop;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private int point;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}
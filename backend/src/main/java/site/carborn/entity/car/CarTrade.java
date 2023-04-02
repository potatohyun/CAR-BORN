package site.carborn.entity.car;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_TRADE")
@Getter
@Setter
@NoArgsConstructor
public class CarTrade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "BUYER_ID")
    private Account buyerAccount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "SELLER_ID")
    private Account sellerAccount;

    private int price;

    @Column(length = 200)
    private String contractHash;

    @Column(length = 200)
    private String metadataUri;

    private LocalDateTime regDt;
}

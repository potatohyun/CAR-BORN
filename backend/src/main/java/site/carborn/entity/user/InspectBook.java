package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_INSPECT_BOOK")
@Getter
@Setter
@NoArgsConstructor
public class InspectBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INSPECTOR_ID")
    private Inspector inspector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private int bookStatus;

    private LocalDateTime bookDt;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}

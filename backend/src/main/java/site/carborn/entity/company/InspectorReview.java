package site.carborn.entity.company;

import jakarta.persistence.*;
import lombok.*;
import site.carborn.entity.account.Account;
import site.carborn.entity.user.InspectResult;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_INSPECTOR_REVIEW")
@Getter
@Setter
@NoArgsConstructor
public class InspectorReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "INSPECT_RESULT_ID")
    private InspectResult inspectResult;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "INSPECTOR_ID")
    private Inspector inspector;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private int point;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}

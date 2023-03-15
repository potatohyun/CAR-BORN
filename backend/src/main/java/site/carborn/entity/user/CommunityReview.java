package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Account;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_COMMUNITY_REVIEW")
@Getter
@Setter
@NoArgsConstructor
public class CommunityReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMUNITY_ID")
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    private String content;

    private LocalDateTime regDt;

    private LocalDateTime uptDt;

    private boolean status;
}

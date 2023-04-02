package site.carborn.entity.company;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Company;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CBR")
@Getter
@Setter
@NoArgsConstructor
public class Cbr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Column(length = 200)
    private String imgNm;

    private LocalDateTime regDt;
}

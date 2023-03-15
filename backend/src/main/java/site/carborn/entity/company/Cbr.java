package site.carborn.entity.company;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.account.Company;

@Entity
@Table(name = "MWS_CBR")
@Getter
@Setter
@NoArgsConstructor
public class Cbr {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Column(length = 200)
    private String imgNm;
}

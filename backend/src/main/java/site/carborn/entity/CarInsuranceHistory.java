package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_INSURANCE_HISTORY")
@Getter
@Setter
public class CarInsuranceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INSURANCE_COM_ID")
    private InsuranceCompany insuranceCompany;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    @Column(length = 200)
    private String category;

    private String content;

    private LocalDateTime insuranceDt;

    private LocalDateTime regDt;
}

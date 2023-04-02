package site.carborn.entity.car;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import site.carborn.entity.company.InsuranceCompany;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_INSURANCE_HISTORY")
@Getter
@Setter
@NoArgsConstructor
public class CarInsuranceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "INSURANCE_COM_ID")
    private InsuranceCompany insuranceCompany;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    @Column(length = 200)
    private String carVin;

    @Column(length = 200)
    private String category;

    private String content;

    @Column(length = 200)
    private String insuranceImgNm;

    private LocalDateTime insuranceDt;

    @Column(length = 200)
    private String contractHash;

    @Column(length = 200)
    private String metadataUri;

    private LocalDateTime regDt;

    public static CarInsuranceHistory copy(CarInsuranceHistory carInsuranceHistory){
        CarInsuranceHistory cih = new CarInsuranceHistory();
        BeanUtils.copyProperties(carInsuranceHistory, cih);
        return cih;
    }
}

package site.carborn.entity.car;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.carborn.entity.car.Car;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_CAR_VRC")
@Getter
@Setter
@NoArgsConstructor
public class CarVrc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CAR_ID")
    private Car car;

    @Column(length = 200)
    private String imgNm;

    @Column(length = 200)
    private String contractHash;

    private LocalDateTime regDt;
}

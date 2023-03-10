package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_SMS_AUTH")
@Getter
@Setter
public class SmsAuth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50)
    private String phoneNm;

    @Column(length = 50)
    private String authNm;

    private LocalDateTime regDt;

    private LocalDateTime expDt;

    private boolean status;
}

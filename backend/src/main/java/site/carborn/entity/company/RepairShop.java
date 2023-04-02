package site.carborn.entity.company;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import site.carborn.entity.account.Account;

@Entity
@Table(name = "MWS_REPAIR_SHOP")
@Getter
@Setter
@NoArgsConstructor
public class RepairShop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ACCOUNT_ID")
//    @JsonIgnore // 해당 클래스의 모든 속성 지정
    private Account account;

    @Column(length = 200)
    private String address;

    private double lat;

    private double lng;
}

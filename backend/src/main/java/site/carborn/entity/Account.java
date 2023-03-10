package site.carborn.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "MWS_ACCOUNT")
@Getter
@Setter
public class Account {
    @Id
    @Column(length = 50)
    private String id;

    @Column(length = 50)
    private String pwd;

    @Column(length = 50)
    private String name;

    @Column(length = 50)
    private String phoneNo;

    @Column(length = 500)
    private String walletHash;

    private int auth;
}
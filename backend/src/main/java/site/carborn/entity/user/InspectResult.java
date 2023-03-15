package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_INSPECT_RESULT")
@Getter
@Setter
@NoArgsConstructor
public class InspectResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "INSPECT_BOOK_ID")
    private InspectBook inspectBook;

    private String content;

    private int mileage;

    @Column(length = 200)
    private String beforeImgNm;

    @Column(length = 200)
    private String afterImgNm;

    @Column(length = 200)
    private String receiptImgNm;

    private LocalDateTime inspectDt;

    private LocalDateTime regDt;
}

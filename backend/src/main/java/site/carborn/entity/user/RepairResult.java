package site.carborn.entity.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.BeanUtils;
import site.carborn.dto.request.RepairResultRequestDTO;
import site.carborn.entity.board.Board;

import java.time.LocalDateTime;

@Entity
@Table(name = "MWS_REPAIR_RESULT")
@Getter
@Setter
@NoArgsConstructor
public class RepairResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "REPAIR_BOOK_ID")
    private RepairBook repairBook;

    private String content;

    private int mileage;

    @Column(length = 200)
    private String beforeImgNm;

    @Column(length = 200)
    private String afterImgNm;

    @Column(length = 200)
    private String receiptImgNm;

    private int repairPrice;

    private LocalDateTime repairDt;

    @Column(length = 200)
    private String contractHash;

    @Column(length = 200)
    private String metadataUri;

    private LocalDateTime regDt;

    public static RepairResult copy(RepairResult repairResult) {
        RepairResult rr = new RepairResult();
        BeanUtils.copyProperties(repairResult, rr);
        return rr;
    }
}

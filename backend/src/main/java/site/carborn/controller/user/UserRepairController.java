package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.company.RepairShopReview;
import site.carborn.entity.user.RepairBook;
import site.carborn.mapping.company.RepairShopReviewMapping;
import site.carborn.mapping.user.RepairResultGetDetailMapping;
import site.carborn.mapping.user.UserRepairBookDetailMapping;
import site.carborn.mapping.user.UserRepairBookListMapping;
import site.carborn.mapping.user.UserRepairResultListMapping;
import site.carborn.service.user.UserRepairService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 RepairShop 조회", description = "사용자가 RepairShop에 대한 정보를 조회하는 경우")
@RequestMapping("/api/user/repair")
@RequiredArgsConstructor
@RestController
public class UserRepairController {

    @Autowired
    private UserRepairService userRepairService;

    // 정비 예약 관리
    @GetMapping("/book/list/{page}/{size}")
    @Operation(description = "사용자의 정비소 예약 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지내 게시글 수")
    })
    public ResponseEntity<?> getRepairBookList(@PathVariable("page") int page,
                                               @PathVariable("size") int size) {
        String accountId = "testuser2"; //스프링시큐리티 구현시 변경예정
        Page<UserRepairBookListMapping> result = userRepairService.repairBookList(accountId, page, size);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @GetMapping("/book/{repairBookId}")
    @Operation(description = "정비소 예약 단일 조회")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public ResponseEntity<?> getRepairBook(@PathVariable("repairBookId") Integer repairBookId) {
        UserRepairBookDetailMapping repairBook = userRepairService.repairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, repairBook);
    }

    @PostMapping("/book")
    @Operation(description = "사용자 정비소 예약")
    public ResponseEntity<?> createRepairBook(@RequestBody RepairBook repairBook) {
        userRepairService.createRepairBook(repairBook);
        return NormalResponse.toResponseEntity(HttpStatus.OK, userRepairService.createRepairBook(repairBook));
    }

    @DeleteMapping("/book/{repairBookId}")
    @Operation(description = "사용자 정비소 예약 삭제")
    @Parameter(name = "repairBookId", description = "예약 게시글 id")
    public ResponseEntity<?> deleteRepairBook(@PathVariable("repairBookId") Integer repairBookId) {
        userRepairService.deleteRepairBook(repairBookId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @PutMapping("/book")
    @Operation(description = "사용자 정비소 예약 내역 수정")
    public ResponseEntity<?> updateRepairBook(@RequestBody RepairBook repairBook) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, userRepairService.updateRepairBook(repairBook));
    }


    //정비 완료 관리
    @GetMapping("/result/list/{page}")
    @Operation(description = "사용자의 정비 완료 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호")
    })
    public ResponseEntity<?> getRepairResultList(@PathVariable("page") int page) {
        String accountId = "testuser2"; //스프링시큐리티 구현시 변경예정
        Page<UserRepairResultListMapping> result = userRepairService.repairResultList(accountId, page);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @GetMapping("/result/{repairResultId}")
    @Operation(description = "사용자의 정비 완료 단일 조회")
    @Parameter(name = "repairResultId", description = "정비 결과 게시글 id")
    public ResponseEntity<?> getRepairResultDetail(@PathVariable("repairResultId") int repairResultId) {
        RepairResultGetDetailMapping result = userRepairService.repairResultDetail(repairResultId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }


    // 리뷰 관리
    @GetMapping("result/review/{repairResultId}")
    @Operation(description = "사용자의 정비완료에 대한 리뷰 조회")
    @Parameter(name = "repairResultId", description = "정비 결과 게시글 id")
    public ResponseEntity<?> getRepairReviewDetail(@PathVariable int repairResultId) {
        RepairShopReviewMapping detail = userRepairService.getRepairReviewDetail(repairResultId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, detail);
    }

    @PostMapping("/result/review/{repairResultId}")
    @Operation(description = "사용자의 검수완료 리뷰 작성")
    @Parameter(name = "inspectResultId", description = "검수 결과 게시글 id")
    public ResponseEntity<?> getInspectReviewList(@PathVariable int repairResultId,
                                                  @RequestBody RepairShopReview repairShopReview) {
        int result = userRepairService.createInspectReview(repairResultId, repairShopReview);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

}

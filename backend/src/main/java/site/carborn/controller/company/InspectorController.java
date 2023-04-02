package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.InspectResultRequestDTO;
import site.carborn.entity.user.InspectBook;
import site.carborn.service.company.InspectorService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;
import site.carborn.util.network.NormalResponse;

import java.io.IOException;
import java.util.Optional;

@Tag(name = "Inspector", description = "검수원 검수 관련 API")
@RequestMapping("/api/inspector")
@RequiredArgsConstructor
@RestController
public class InspectorController {
    @Autowired
    private InspectorService inspectorService;

    @GetMapping("/book/list/{page}/{size}")
    @Operation(description = "검사소 검수 예약 전체 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> inspectBookList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, inspectorService.inspectBookGetList(pageRequest));
    }

    @GetMapping("/book/{inspectBookId}")
    @Operation(description = "검사소 검수 예약 상세 조회")
    @Parameter(name = "inspectBookId", description = "예약 번호")
    public ResponseEntity<?> inspectBookDetailContent(@PathVariable("inspectBookId") int inspectBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectBookDetail(inspectBookId));
    }

    @PutMapping("/book")
    @Operation(description = "검수원 검수 예약 상태 수정 및 검수 데이터 입력")
    @Parameter(name = "inspectBookId", description = "예약 번호")
    public ResponseEntity<?> inspectBookUpdate(@ModelAttribute InspectResultRequestDTO dto) throws IOException {
        Optional<InspectBook> updateData = inspectorService.inspectBookUpdateData(dto.getInspectBook().getId());
        //데이터가 빈 경우
        if(!updateData.isPresent()){
            throw new NullPointerException("예약번호에 해당하는 데이터가 없습니다");
        }
        //BookStatus가 정상적으로 들어오지 않았을때
        if(dto.getInspectBook().getBookStatus() != BookUtils.BOOK_STATUS_CANCEL && dto.getInspectBook().getBookStatus() != BookUtils.BOOK_STATUS_COMPLETE){
            throw new RuntimeException("예약 변경 데이터가 잘못되었습니다.");
        }

        //예약 취소
        else if(dto.getInspectBook().getBookStatus() == BookUtils.BOOK_STATUS_CANCEL) {
            inspectorService.inspectorBookUpdate(updateData.get(), BookUtils.BOOK_STATUS_CANCEL);
            return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
        }

        //예약 상태 수정
        inspectorService.inspectorBookUpdate(updateData.get(),BookUtils.BOOK_STATUS_COMPLETE);
        //정비 결과 입력
        inspectorService.inspectorResultInsert(dto);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);

    }

    @GetMapping("/result/list/{page}/{size}")
    @Operation(description = "검수원 검수 완료 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> inspectResultList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectResultGetList(pageRequest));
    }

    @GetMapping("/result/{inspectResultId}")
    @Operation(description = "검수원 검수 완료 상세 조회")
    @Parameter(name = "inspectResultId", description = "검수 완료 목록 번호")
    public ResponseEntity<?> inspectResultDetailContent(@PathVariable("inspectResultId") int inspectResultId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectResultDetail(inspectResultId));
    }

    @GetMapping("/result/review/{inspectResultId}")
    @Operation(description = "검수원 검수 완료 리뷰 조회")
    @Parameter(name = "inspectResultId", description = "검수 완료 목록 번호")
    public ResponseEntity<?> inspectResultReview(@PathVariable("inspectResultId") int inspectResultId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectResultReview(inspectResultId));
    }
}

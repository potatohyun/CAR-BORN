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
import site.carborn.entity.user.InspectResult;
import site.carborn.service.company.InspectorService;
import site.carborn.util.board.BoardUtils;
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
    @Operation(description = "검수원 검수 예약 전체 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> inspectBookList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, inspectorService.inspectBookGetList(pageRequest));
    }

    @GetMapping("/book/{inspectBookId}")
    @Operation(description = "검수원 검수 예약 상세 조회")
    @Parameter(name = "inspectBookId", description = "예약 번호")
    public ResponseEntity<?> inspectBookDetailContent(@PathVariable("inspectBookId") int inspectBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectBookDetail(inspectBookId));
    }

    @PutMapping("/book")
    @Operation(description = "검수원 검수 예약 상태 수정 및 검수 데이터 입력")
    @Parameter(name = "inspectBookId", description = "예약 번호")
    public ResponseEntity<?> inspectBookUpdate(InspectResultRequestDTO dto) throws IOException {
        Optional<InspectBook> updateData = inspectorService.inspectBookUpdateData(dto.getInspectBook().getId());
        if(!updateData.isPresent()){
            return NormalResponse.toResponseEntity(HttpStatus.BAD_REQUEST,"예약 번호가 잘못되었습니다.");
        }
        //예약 상태 수정
        inspectorService.inspectorBookUpdate(updateData.get());
        
        //검수 결과 입력
        inspectorService.inspectorResultInsert(dto);

        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("result/{inspectBookId}")
    @Operation(description = "검수원 검수 완료 상세 조회")
    @Parameter(name = "inspectBookId", description = "검수 완료 예약 번호")
    public ResponseEntity<?> inspectResultDetailContent(@PathVariable("inspectBookId") int inspectBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectResultDetail(inspectBookId));
    }

    @GetMapping("result/review/{inspectResultId}")
    @Operation(description = "검수원 검수 완료 리뷰 조회")
    @Parameter(name = "inspectResultId", description = "검수 완료 목록 번호")
    public ResponseEntity<?> inspectResultReview(@PathVariable("inspectResultId") int inspectResultId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,inspectorService.inspectResultReview(inspectResultId));
    }
}

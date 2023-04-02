package site.carborn.controller.company;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.CarInsuranceHistoryRequestDTO;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.car.CarInsuranceHistoryGetListMapping;
import site.carborn.service.company.InsuranceService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.io.IOException;


@Tag(name = "Insurance History", description = "보험회사 손상 내역 관련 API")
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
@RestController
public class InsuranceController {
    @Autowired
    private InsuranceService insuranceService;

    @PostMapping
    @Operation(description = "보험회사 손상 내역 등록")
    public ResponseEntity<?> insertCarInsuranceHistory(@ModelAttribute CarInsuranceHistoryRequestDTO dto) throws IOException {
        insuranceService.insertCarInsuranceHistory(dto);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("/list/{page}/{size}")
    @Operation(description = "보험회사 손상 내역 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호")
            ,@Parameter(name = "size", description = "한 페이지 개수")
    })
    public ResponseEntity<?> carInsuranceHistoryList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        Page<CarInsuranceHistoryGetListMapping> result = insuranceService.carinsuranceHistoryList(pageRequest);

        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @GetMapping("/list/{id}")
    @Operation(description = "보험회사 손상 내역 상세 조회")
    @Parameter(name = "id", description = "게시물 번호")
    public ResponseEntity<?> carInsuranceHistoryDetailContent(@PathVariable("id") int id){
        CarInsuranceHistoryGetDetailMapping result = insuranceService.carinsuranceHistoryDetail(id);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

}

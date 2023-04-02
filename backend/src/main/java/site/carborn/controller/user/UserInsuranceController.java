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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.mapping.car.CarInsuranceHistoryGetDetailMapping;
import site.carborn.mapping.user.UserInsuranceListMapping;
import site.carborn.service.user.UserInsuranceService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 Insurance 조회", description = "사용자가 보험내역에 대한 정보를 조회하는 경우")
@RequestMapping("/api/user/insurance")
@RequiredArgsConstructor
@RestController
public class UserInsuranceController {
    @Autowired
    private UserInsuranceService userInsuranceService;

    @GetMapping("list/{page}/{size}")
    @Operation(description = "사용자의 보험 목록 조회")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 게시물 수")
    })
    public ResponseEntity<?> getInsuranceList(@PathVariable("page") int page,
                                              @PathVariable("size") int size) {
        String accountId = "usertest";
        Page<UserInsuranceListMapping> result = userInsuranceService.insuranceList(accountId, page, size);
        return NormalResponse.toResponseEntity(HttpStatus.OK, result);
    }

    @GetMapping("/{insuranceId}")
    @Operation(description = "사용자의 보험내역 단일 조회")
    @Parameter(name = "insuranceId", description = "보험내역 id")
    public ResponseEntity<?> getInspectBook(@PathVariable("insuranceId") int insuranceId) {
        CarInsuranceHistoryGetDetailMapping insuranceDetail = userInsuranceService.insuranceDetail(insuranceId);
        return NormalResponse.toResponseEntity(HttpStatus.OK, insuranceDetail);
    }

}

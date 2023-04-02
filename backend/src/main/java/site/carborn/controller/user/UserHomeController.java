package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.service.user.UserHomeService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

@Tag(name = "사용자 홈 화면", description = "사용자 홈 화면 부가요소")
@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class UserHomeController {

    @Autowired
    private UserHomeService userHomeService;

    @GetMapping("/car/count")
    @Operation(description = "홈 화면 등록된 차량 수")
    public ResponseEntity<?> getCarCount(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userHomeService.getCarCount());
    }

    @GetMapping("/repair/count")
    @Operation(description = "정비업체 수")
    public ResponseEntity<?> getRepairCount(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userHomeService.getRepairCount());
    }

    @GetMapping("/inspector/count")
    @Operation(description = "검사소 수")
    public ResponseEntity<?> getInspectorCount(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userHomeService.getInspectorCount());
    }

    @GetMapping("/car-trade/count")
    @Operation(description = "누적 차량 거래 수")
    public ResponseEntity<?> getCarSaleCount(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userHomeService.getCarSaleCount());
    }

    @GetMapping("/car-regist/list")
    @Operation(description = "최신 판매 등록 차량 정보")
    public ResponseEntity<?> getCarSaleAddList(){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userHomeService.getNewCarSaleList());
    }
}

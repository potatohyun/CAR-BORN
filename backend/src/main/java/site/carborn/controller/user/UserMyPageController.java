package site.carborn.controller.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.CarRequestDTO;
import site.carborn.entity.car.Car;
import site.carborn.mapping.car.CarGetDetailMapping;
import site.carborn.mapping.car.CarImageGetDataMapping;
import site.carborn.mapping.car.CarVrcGetDataMapping;
import site.carborn.service.user.UserMyPageService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Tag(name = "UserMyPage", description = "UserMypage 관련 API")
@RequestMapping("/api/user")
@RequiredArgsConstructor
@RestController
public class UserMyPageController {

    @Autowired
    private UserMyPageService userMyPageService;

    @PostMapping("/car")
    @Operation(description = "차량 등록")
    public ResponseEntity<?> addCar(@ModelAttribute CarRequestDTO dto) throws IOException {
        Car car = userMyPageService.insertCar(dto);
        userMyPageService.insertCarImage(dto, car);
        userMyPageService.insertCarVrc(dto, car);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }

    @GetMapping("/car/list/{page}/{size}")
    @Operation(description = "차량 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> getCarList(@PathVariable("page") int page, @PathVariable("size") int size) {
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id", BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK, userMyPageService.getCarList(pageRequest));
    }

    @GetMapping("/car/{carId}")
    @Operation(description = "차량 상세 정보")
    @Parameter(name = "carId", description = "차량 번호")
    public ResponseEntity<?> getCarDetail(@PathVariable("carId") int carId) {
        CarGetDetailMapping cgdm = userMyPageService.getCarDetail(carId);
        List<CarImageGetDataMapping> cigdm = userMyPageService.getImageList(carId);
        CarVrcGetDataMapping cvgdm = userMyPageService.getCarVrcData(carId);

        HashMap<String, Object> returnData = new HashMap<>();
        returnData.put("detail",cgdm);
        returnData.put("img",cigdm);
        returnData.put("vrc",cvgdm);

        return NormalResponse.toResponseEntity(HttpStatus.OK, returnData);
    }

    @GetMapping("/car/sell/list/{page}/{size}")
    @Operation(description = "차량 판매 내역")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> getCarSellList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id", BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK,userMyPageService.getCarSellList(pageRequest));
    }

    @GetMapping("/car/buy/list/{page}/{size}")
    @Operation(description = "차량 구매 내역")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 사이즈")
    })
    public ResponseEntity<?> getCarBuyList(@PathVariable("page") int page, @PathVariable("size") int size){
        PageRequest pageRequest = BoardUtils.pageRequestInit(page, size, "id", BoardUtils.ORDER_BY_DESC);
        return NormalResponse.toResponseEntity(HttpStatus.OK,userMyPageService.getCarBuyList(pageRequest));
    }

    @PutMapping("/buy/cancel/{carSaleBookId}")
    @Operation(description = "차량 구매 취소")
    @Parameters({
            @Parameter(name = "carSaleBookId", description = "차량 구매 내역 페이지 번호")
    })
    public ResponseEntity<?> updateSaleBookCancel(@PathVariable("carSaleBookId") int carSaleBookId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userMyPageService.updateBookCancel(carSaleBookId));
    }

    @PutMapping("/sell/cancel/{carSaleId}")
    @Operation(description = "차량 판매 취소")
    @Parameters({
            @Parameter(name = "carSaleId", description = "차량 판매 내역 페이지 번호")
    })
    public ResponseEntity<?> updateSaleCancel(@PathVariable("carSaleId") int carSaleId){
        return NormalResponse.toResponseEntity(HttpStatus.OK,userMyPageService.updateSaleCancel(carSaleId));
    }
}

package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.service.common.AddressService;
import site.carborn.util.network.NormalResponse;


@Tag(name = "Address", description = "주소 조회 API")
@RequestMapping("/api/address")
@RequiredArgsConstructor
@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/convert-geo/{address}")
    @Operation(description = "주소에 해당하는 지역에 대한 위도, 경도 데이터")
    @Parameters({
            @Parameter(name = "address", description = "주소")
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("address") String address) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getGeoAddress(address));
    }

    @GetMapping("/reverse-geo/{lat}/{lng}")
    @Operation(description = "위도, 경도와 일치하는 지역에 대한 도로명주소")
    @Parameters({
            @Parameter(name = "lat", description = "주소를 조회할 지역의 위도")
            ,@Parameter(name = "lng", description = "주소를 조회할 지역의 경도")
    })
    public ResponseEntity<?> getReverseGeo(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getReverseGeo(lat, lng));
    }
    @GetMapping("/convert-geo/jibun/{address}")
    @Operation(description = "도로명 주소로 지번 및 우편번호를 조회")
    @Parameters({
            @Parameter(name = "address", description = "주소")
    })
    public ResponseEntity<?> getGeoAddressJibun(@PathVariable("address") String address) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,addressService.getGeoAddressJibun(address));
    }
}

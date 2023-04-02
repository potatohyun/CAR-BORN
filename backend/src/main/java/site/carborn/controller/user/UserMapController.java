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
import site.carborn.service.common.MapService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.AuthUtils;
import site.carborn.util.network.NormalResponse;

@Tag(name = "Map", description = "지도 관련 API")
@RequestMapping("/api/user/map")
@RequiredArgsConstructor
@RestController
public class UserMapController {

    @Autowired
    private MapService mapService;

    @GetMapping("/list/{lat}/{lng}")
    @Operation(description = "현재 위치에 따른 지도 검사소, 정비소 데이터")
    @Parameters({
            @Parameter(name = "lat", description = "위도"),
            @Parameter(name = "lng", description = "경도")
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("lat") double lat, @PathVariable("lng") double lng) {
        return NormalResponse.toResponseEntity(HttpStatus.OK,mapService.getMapData(lat,lng));
    }

    @GetMapping("/review/{companyId}/{auth}/{page}/{size}")
    @Operation(description = "해당하는 회사의 리뷰 전체 목록")
    @Parameters({
            @Parameter(name = "companyId", description = "검사소 또는 정비소 아이디"),
            @Parameter(name = "auth", description = "검사소, 정비소 구분 권한")
    })
    public ResponseEntity<?> getGeoAddress(@PathVariable("companyId") int companyId, @PathVariable("auth") int auth, @PathVariable("page") int page, @PathVariable("size") int size) {
        if(auth != AuthUtils.AUTH_REPAIR_SHOP && auth != AuthUtils.AUTH_INSPECTOR){
            throw new NullPointerException("잘못된 회사 등급입니다.");
        }
        PageRequest pageRequest = BoardUtils.pageRequestInit(page,size, "id" ,BoardUtils.ORDER_BY_DESC);
        if(auth == AuthUtils.AUTH_REPAIR_SHOP){
            return NormalResponse.toResponseEntity(HttpStatus.OK,mapService.getRepairReview(companyId,pageRequest));
        }
        else if(auth == AuthUtils.AUTH_INSPECTOR){
            return NormalResponse.toResponseEntity(HttpStatus.OK,mapService.getInspectorReview(companyId,pageRequest));
        }
        throw new NullPointerException("해당하는 회사의 리뷰가 없습니다.");
    }
}

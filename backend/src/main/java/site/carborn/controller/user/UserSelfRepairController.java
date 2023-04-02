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
import site.carborn.entity.user.SelfRepair;
import site.carborn.mapping.user.UserInspectBookDetailMapping;
import site.carborn.mapping.user.UserInspectBookListMapping;
import site.carborn.service.user.UserSelfRepairService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "self-repair")
@RequestMapping("/api/user/self-repair")
@RequiredArgsConstructor
@RestController
public class UserSelfRepairController {
    @Autowired
    private UserSelfRepairService userSelfRepairService;

    @GetMapping("/list/{page}/{size}")
    @Operation(description = "사용자의 셀프 수리 목록")
    @Parameters({
            @Parameter(name = "page", description = "페이지 번호"),
            @Parameter(name = "size", description = "페이지 당 게시물 수")
    })
    public ResponseEntity<?> getSelfRepairsList(@PathVariable("page") int page,
                                                @PathVariable("size") int size){
        Page<SelfRepair> selfRepairsList = userSelfRepairService.selfRepairsList(page,size);
        return NormalResponse.toResponseEntity(HttpStatus.OK,selfRepairsList);
    }

    @GetMapping("/{selfRepairId}")
    @Operation(description = "사용자의 셀프 수리 단일 조회")
    @Parameter(name = "selfRepairId", description = "글 id")
    public ResponseEntity<?> selfRepairDetail(@PathVariable("selfRepairId") int selfRepairId){
        SelfRepair selfRepair = userSelfRepairService.selfRepairDetail(selfRepairId);
        return NormalResponse.toResponseEntity(HttpStatus.OK,selfRepair);
    }


}

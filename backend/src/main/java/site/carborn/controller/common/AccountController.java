package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.dto.request.ResetPwdRequestDTO;
import site.carborn.entity.account.Account;
import site.carborn.service.common.AccountService;
import site.carborn.util.network.NormalResponse;

@Slf4j
@RestController
@RequestMapping("/api")
@Tag(name = "Account", description = "계정 관련 API")
public class AccountController {
    @Autowired
    AccountService accountService;

    @PostMapping("/find-id")
    public ResponseEntity<?> findId(@RequestBody Account account) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, accountService.findId(account));
    }

    @PostMapping("/find-pw")
    public ResponseEntity<?> findPw(@RequestBody Account account) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, accountService.findPw(account));
    }

    @PatchMapping("/reset-pw")
    public ResponseEntity<?> resetPw(@RequestBody Account account) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, accountService.resetPw(account));
    }

    @PostMapping("/user/reset-pw")
    public ResponseEntity<?> resetPwWithLogin(@RequestBody ResetPwdRequestDTO dto) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, accountService.resetPwWithLogin(dto));
    }
}

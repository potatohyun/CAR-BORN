package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.entity.account.Account;
import site.carborn.service.common.LoginService;
import site.carborn.util.network.NormalResponse;

@Tag(name = "Login", description = "로그인 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/login")
    @Operation(description = "로그인")
    @Parameters({
            @Parameter(name = "id", description = "아이디")
            ,@Parameter(name = "pwd", description = "비밀번호")
    })
    public ResponseEntity<?> login(@RequestBody Account account, HttpServletRequest request) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, loginService.login(account, request));
    }

    @GetMapping("/logout")
    @Operation(description = "로그아웃")
    public ResponseEntity<?> logout(RequestEntity<?> httpMessage) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, loginService.logout(httpMessage));
    }
}

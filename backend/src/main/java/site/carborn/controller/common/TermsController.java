package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.carborn.service.common.TermsService;
import site.carborn.util.network.NormalResponse;

@Slf4j
@Tag(name = "TERMS", description = "약관 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class TermsController {
    @Autowired
    TermsService termsService;

    @GetMapping("/terms/{id}")
    public ResponseEntity<?> terms(@PathVariable int id) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, termsService.getTerms(id));
    }
}

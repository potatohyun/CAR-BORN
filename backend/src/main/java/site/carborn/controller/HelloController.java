package site.carborn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.service.HelloService;
import site.carborn.util.network.NormalResponse;

@RestController
@CrossOrigin(origins = "*")
public class HelloController {

    @GetMapping("/api/hello")
    public String test() {return "Hello, world!";}

    @Autowired
    HelloService helloService;

    @GetMapping("/api/hello/{accountId}")
    public ResponseEntity<?> test(@PathVariable String accountId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, helloService.hello(accountId));
    }
}

package site.carborn.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.entity.car.CarTrade;
import site.carborn.repository.user.CarTradeRepository;
import site.carborn.service.HelloService;
import site.carborn.util.network.NormalResponse;

@RestController
@CrossOrigin(origins = "*")
public class HelloController {
    @Autowired
    HelloService helloService;

    @Autowired
    CarTradeRepository carTradeRepository;

    @GetMapping("/api/hello")
    public String test() {return "Hello, world!";}

    @GetMapping("/api/hello/{accountId}")
    public ResponseEntity<?> test(@PathVariable String accountId) {
        return NormalResponse.toResponseEntity(HttpStatus.OK, helloService.hello(accountId));
    }

    @GetMapping("/api/hello/car-trade/{id}")
    public ResponseEntity<?> carTradeTest(@PathVariable int id) {
        CarTrade carTrade = carTradeRepository.findById(id).orElseThrow(() ->
                new NullPointerException("조회하려는 데이터가 없습니다")
        );
        return NormalResponse.toResponseEntity(HttpStatus.OK, carTrade);
    }
}

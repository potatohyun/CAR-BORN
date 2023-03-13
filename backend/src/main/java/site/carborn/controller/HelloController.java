package site.carborn.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class HelloController {
    @GetMapping("/api/hello")
    public String test() {
        return "Hello, world!";
    }
}

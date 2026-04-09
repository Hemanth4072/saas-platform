package com.example.backend.controller;

import com.example.backend.model.Greeting;
import com.example.backend.service.GreetingService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/greetings")
@CrossOrigin(origins = "http://localhost:5173")
public class GreetingController {

    private final GreetingService greetingService;

    public GreetingController(GreetingService greetingService) {
        this.greetingService = greetingService;
    }

    @GetMapping
    public List<Greeting> getGreetings() {
        return greetingService.getGreetings();
    }
}

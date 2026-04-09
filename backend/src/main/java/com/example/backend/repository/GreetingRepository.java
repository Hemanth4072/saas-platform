package com.example.backend.repository;

import com.example.backend.model.Greeting;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GreetingRepository {

    public List<Greeting> findAll() {
        return List.of(
                new Greeting(1L, "Hello from Spring Boot!"),
                new Greeting(2L, "REST API is connected to React.")
        );
    }
}

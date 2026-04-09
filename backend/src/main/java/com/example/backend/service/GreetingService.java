package com.example.backend.service;

import com.example.backend.model.Greeting;
import com.example.backend.repository.GreetingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GreetingService {

    private final GreetingRepository greetingRepository;

    public GreetingService(GreetingRepository greetingRepository) {
        this.greetingRepository = greetingRepository;
    }

    public List<Greeting> getGreetings() {
        return greetingRepository.findAll();
    }
}

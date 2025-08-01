package com.example.travelplanner.dto;

import org.springframework.stereotype.Component;

import com.example.travelplanner.entity.User;
import com.example.travelplanner.repository.UserRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataLoader {
    private UserRepository userRepository;
    
    public DataLoader (UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void loadData() {
        // Clear the database here
        userRepository.deleteAll();

        // Load data
        userRepository.save(User.builder().firstName("Nicole").lastName("Kidman").contactNo("12345678").email("nicole.kidman@gmail.com").countryOfOrigin("USA").build());
        userRepository.save(User.builder().firstName("Nicole").lastName("Changmin").contactNo("12345678").email("nicole.changmin@gmail.com").countryOfOrigin("Singapore").build());
        userRepository.save(User.builder().firstName("Mona").lastName("Lisa").contactNo("12345678").email("mona.lisa@gmail.com").countryOfOrigin("Italy").build());
        userRepository.save(User.builder().firstName("Peter").lastName("Parker").contactNo("12345678").email("peter.parker@gmail.com").countryOfOrigin("USA").build());
    }
}

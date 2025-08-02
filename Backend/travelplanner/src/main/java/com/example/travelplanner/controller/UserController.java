package com.example.travelplanner.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.travelplanner.entity.Itinerary;
import com.example.travelplanner.entity.User;
import com.example.travelplanner.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        logger.info("🟢 Creating user");
        User newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // NESTED ROUTE - add itinerary to user
    @PostMapping("/{id}/itineraries")
    public ResponseEntity<Itinerary> addItineraryToUser(@PathVariable Long id,
            @Valid @RequestBody Itinerary itinerary) {
        Itinerary newItinerary = userService.addItineraryToUser(id, itinerary);
        return new ResponseEntity<>(newItinerary, HttpStatus.CREATED);
    }

    // Read all
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String firstName) {
        logger.info("🟢 Getting all users");

        if (firstName != null && !firstName.trim().isEmpty()) {
            List<User> users = userService.findByFirstNameContainingIgnoreCase(firstName);
            return new ResponseEntity<>(users, HttpStatus.OK);
        }
        if (firstName != null && !firstName.trim().isEmpty()) {
            List<User> users = userService.findByFirstNameIgnoreCase(firstName);
            return new ResponseEntity<>(users, HttpStatus.OK);
        }

        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    // Read one
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        logger.info("🟢 Getting user with particular id");
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        logger.info("🟢 Updating user with particular id");
        User updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        logger.info("🟢 Deleting user with particular id");
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

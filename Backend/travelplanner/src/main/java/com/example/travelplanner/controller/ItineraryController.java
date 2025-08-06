package com.example.travelplanner.controller;

import com.example.travelplanner.dto.ItineraryWithTotalDTO;
import com.example.travelplanner.entity.Itinerary;
import com.example.travelplanner.entity.Trip;
import com.example.travelplanner.service.ItineraryService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itineraries")
public class ItineraryController {
    private static final Logger logger = LoggerFactory.getLogger(ItineraryController.class);

    private final ItineraryService service;

    public ItineraryController(ItineraryService service) {
        this.service = service;
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Itinerary> updateItinerary(@PathVariable Long id, @RequestBody Itinerary itinerary) {
        logger.info("🟢 Updating itinerary with particular id");
        Itinerary updatedItinerary = service.updateItinerary(id, itinerary);
        return new ResponseEntity<>(updatedItinerary, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Itinerary> create(@Valid @RequestBody Itinerary itinerary) {
        return ResponseEntity.ok(service.createItinerary(itinerary));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItineraryWithTotalDTO> get(@PathVariable Long id) {
        ItineraryWithTotalDTO dto = service.getItinerary(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // NESTED ROUTE - add trip to itinerary
    @PostMapping("/{id}/trips")
    public ResponseEntity<Trip> addTripToItinerary(@PathVariable Long id, @Valid @RequestBody Trip trip) {
        Trip newTrip = service.addTripToItinerary(id, trip);
        return new ResponseEntity<>(newTrip, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Itinerary>> all() {
        return ResponseEntity.ok(service.getAllItineraries());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteItinerary(id);
        return ResponseEntity.noContent().build();
    }
}

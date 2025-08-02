
package com.example.travelplanner.service;

import com.example.travelplanner.entity.Itinerary;
import com.example.travelplanner.exception.ItineraryNotFoundException;
import com.example.travelplanner.repository.ItineraryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItineraryServiceImpl implements ItineraryService {

    private final ItineraryRepository repo;

    public ItineraryServiceImpl(ItineraryRepository repo) {
        this.repo = repo;
    }

    @Override
    public Itinerary createItinerary(Itinerary itinerary) {
        return repo.save(itinerary);
    }

    @Override
    public Itinerary getItinerary(Long id) {
        return repo.findById(id).orElseThrow(() -> new ItineraryNotFoundException(id));
    }

    @Override
    public List<Itinerary> getAllItineraries() {
        return repo.findAll();
    }

    @Override
    public void deleteItinerary(Long id) {
        if (!repo.existsById(id)) {
            throw new ItineraryNotFoundException(id);
        }
        repo.deleteById(id);
    }
}

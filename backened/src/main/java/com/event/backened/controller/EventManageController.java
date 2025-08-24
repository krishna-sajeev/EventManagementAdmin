package com.event.backened.controller;

import com.event.backened.model.EventManage;
import com.event.backened.repository.EventManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EventManageController {

    @Autowired
    EventManageRepository eventRepo;

    @PostMapping("/add")
    public ResponseEntity<?> addEvent(@RequestBody EventManage input){
    Map<String, String> response = new HashMap<>();
        try {
            EventManage event = eventRepo.save(input);
            if (event.getId() != 0) {
                response.put("status", "Event Successfully Added");

            } else {
                response.put("status", "Error occurred");
            }
        } catch (Exception e) {
            response.put("status", "Error");
            response.put("message", e.getMessage());
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/event/view")
    public ResponseEntity<?> view() {
        try {
            List<EventManage> events = eventRepo.findAll();
            if (events.isEmpty()) {
                return ResponseEntity.ok(Map.of("status", "No events available now"));
            } else {
                return ResponseEntity.ok(events);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            Optional<EventManage> event = eventRepo.findById(id);
            if (event == null) {
                return ResponseEntity.ok(Map.of("status", "Event not found"));
            }
            eventRepo.deleteById(id);
            return ResponseEntity.ok(Map.of("status", "Deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/event/update/{id}")
    public ResponseEntity<?> update(@PathVariable int id ,@RequestBody EventManage input){
        try{
            return eventRepo.findById(id).map(eventManage -> {
                eventManage.setEventName(input.getEventName());
                eventManage.setEventType(input.getEventType());
                eventManage.setCapacity(input.getCapacity());
                eventManage.setEndDate(input.getEndDate());
                eventManage.setRemarks(input.getRemarks());
                eventManage.setStatus(input.getStatus());
                eventManage.setVenue(input.getVenue());
                eventManage.setOrganizerType(input.getOrganizerType());
                eventManage.setSpeakerName(input.getSpeakerName());
                eventManage.setStartDate(input.getStartDate());
                return ResponseEntity.ok(eventRepo.save(eventManage));
            }).orElse(ResponseEntity.notFound().build());

            } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
          }
        }



}

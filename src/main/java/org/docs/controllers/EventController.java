package org.docs.controllers;

import org.docs.db.ERole;
import org.docs.db.entities.Event;
import org.docs.db.entities.User;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.UserRepo;
import org.docs.payload.response.EventResponse;
import org.docs.payload.response.EventsResponse;
import org.docs.payload.response.helper.Participant;
import org.docs.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class EventController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @GetMapping("/events")
    public ResponseEntity<?> getEvents() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        if (user.getRole().getERole() == ERole.ROLE_ADMIN) {
            List<Event> events = new ArrayList<>();
            eventRepo.findAll().iterator().forEachRemaining(events::add);

            return ResponseEntity.ok(
                events.stream().map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
            );
        }
        return null;
    }

    @GetMapping("/events/event")
    public ResponseEntity<?> showEvent(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Event event = eventRepo.findById(id).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                event.getUsers().stream().noneMatch(u -> u.getId().equals(user.getId())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new EventResponse(
                event.getName(),
                event.getEventDays().stream().filter(e -> e.getDay().getKey().equals("c-2")).iterator().next().getDate(),
                event.getEventDays().stream().filter(e -> e.getDay().getKey().equals("c1")).iterator().next().getDate(),
                event.getEventDays().stream().filter(e -> e.getDay().getKey().equals("c+1")).iterator().next().getDate(),
                event.getEventDays().stream().filter(e -> e.getDay().getKey().equals("c+2")).iterator().next().getDate(),
                event.getUsers().stream().map(u -> new Participant(u.getFullName(), u.getRole().getName()))
                        .collect(Collectors.toList())
            )
        );
    }
}

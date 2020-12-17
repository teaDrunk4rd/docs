package org.docs.controllers;

import org.docs.db.ERole;
import org.docs.db.entities.Event;
import org.docs.db.entities.EventDay;
import org.docs.db.entities.User;
import org.docs.db.repos.DayRepo;
import org.docs.db.repos.EventDayRepo;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.UserRepo;
import org.docs.payload.request.UnsignedUsersRequest;
import org.docs.payload.request.UpdateEventRequest;
import org.docs.payload.response.EventResponse;
import org.docs.payload.response.EventsResponse;
import org.docs.payload.response.EventUserResponse;
import org.docs.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    private EventDayRepo eventDayRepo;
    @Autowired
    private DayRepo dayRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @GetMapping("/events")
    public ResponseEntity<?> getEvents() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        if (user.getRole().getERole() == ERole.ROLE_ADMIN) {
            return ResponseEntity.ok(
                eventRepo.findAll().stream()
                    .sorted(Comparator.comparing(Event::getName))
                    .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
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
                event.getEventDays().stream().filter(e -> e.getDay().getKey().equals("c+2")).iterator().next().getDate()
            )
        );
    }

    @GetMapping("/events/event/participants")
    public ResponseEntity<?> getEventParticipants(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Event event = eventRepo.findById(id).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                event.getUsers().stream().noneMatch(u -> u.getId().equals(user.getId())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            event.getUsers().stream()
                .map(u -> new EventUserResponse(u.getId(), u.getFullName(), u.getRole().getName()))
                .collect(Collectors.toList())
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/events/event/users")
    public ResponseEntity<?> getUnsignedUsers(@RequestBody UnsignedUsersRequest request) {
        Event event = eventRepo.findById(request.getEventId()).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(
            userRepo.findAll().stream()
                .filter(u -> !request.getParticipantIds().contains(u.getId()) && u.getRole().getERole() != ERole.ROLE_ADMIN)
                .map(u -> new EventUserResponse(u.getId(), u.getFullName(), u.getRole().getName()))
                .collect(Collectors.toList())
        );
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/events/event/update")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody UpdateEventRequest request) {
        Event event = eventRepo.findById(request.getId()).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        event.setName(request.getName());
        event.setUsers(
            userRepo.findAll().stream()
                .filter(u -> request.getParticipantIds().contains(u.getId()))
                .collect(Collectors.toSet())
        );
        eventRepo.saveAndFlush(event);

        eventDayRepo.deleteByEvent(event);
        eventDayRepo.saveAll(Arrays.asList(
            new EventDay(event, dayRepo.findByKey("c-2"), request.getStartDate()),
            new EventDay(event, dayRepo.findByKey("c-1"), incrementDay(request.getStartDate())),
            new EventDay(event, dayRepo.findByKey("c1"), request.getC1Date()),
            new EventDay(event, dayRepo.findByKey("c2"), incrementDay(request.getC1Date())),
            new EventDay(event, dayRepo.findByKey("c+1"), request.getCplus1Date()),
            new EventDay(event, dayRepo.findByKey("c+2"), request.getFinishDate())
        ));

        return ResponseEntity.ok(200);
    }

    private Date incrementDay(Date date) { // TODO: убрать куда-нибудь
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, 1);
        return c.getTime();
    }
}

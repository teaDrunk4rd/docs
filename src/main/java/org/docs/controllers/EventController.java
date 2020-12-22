package org.docs.controllers;

import org.docs.db.ERole;
import org.docs.db.entities.Doc;
import org.docs.db.entities.Event;
import org.docs.db.entities.EventDay;
import org.docs.db.entities.User;
import org.docs.db.repos.*;
import org.docs.payload.request.IdsRequest;
import org.docs.payload.request.EventRequest;
import org.docs.payload.response.DocsResponse;
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
    private DocRepo docRepo;
    @Autowired
    private EventDayRepo eventDayRepo;
    @Autowired
    private DayRepo dayRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @GetMapping("/events")
    public ResponseEntity<?> index() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        return ResponseEntity.ok(
            eventRepo.findAll().stream()
                .filter(e -> user.getRole().getERole() == ERole.ROLE_ADMIN ||
                            e.getUsers().stream().anyMatch(u -> u.getId().equals(user.getId())))
                .sorted(Comparator.comparing(Event::getName))
                .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
        );
    }

    @GetMapping("/events/event")
    public ResponseEntity<?> show(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Event event = eventRepo.findById(id).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                event.getUsers().stream().noneMatch(u -> u.getId().equals(user.getId())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new EventResponse(
                event.getName(),
                event.getEventDay("c-2"),
                event.getEventDay("c-1"),
                event.getEventDay("c1"),
                event.getEventDay("c2"),
                event.getEventDay("c+1"),
                event.getEventDay("c+2")
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
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/events/event/users")
    public ResponseEntity<?> getUnsignedUsers(@RequestBody IdsRequest request) {
        return ResponseEntity.ok(
            userRepo.findAll().stream()
                .filter(u -> !request.getIds().contains(u.getId()) && u.getRole().getERole() != ERole.ROLE_ADMIN)
                .map(u -> new EventUserResponse(u.getId(), u.getFullName(), u.getRole().getName()))
        );
    }

    @GetMapping("/events/event/docs")
    public ResponseEntity<?> getEventDocs(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Event event = eventRepo.findById(id).orElse(null);

        if (event == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                event.getUsers().stream().noneMatch(u -> u.getId().equals(user.getId())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            event.getDocs().stream()
                .filter(d -> user.getRole().getERole() == ERole.ROLE_ADMIN ||
                        d.getEvents().stream()
                                .anyMatch(e -> e.getUsers().stream()
                                        .anyMatch(u -> u.getId().equals(user.getId()) && d.getRole() == u.getRole())))
                .sorted(Comparator.comparing(Doc::getName))
                .map(d -> new DocsResponse(
                    d.getId(),
                    d.getName(),
                    d.getDay().getName(),
                    d.getRole().getName(),
                    d.getSigned()
                ))
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/events/event/freeDocs")
    public ResponseEntity<?> getFreeDocs(@RequestBody IdsRequest request) {
        return ResponseEntity.ok(
            docRepo.findAll().stream()
                .filter(e -> !request.getIds().contains(e.getId()))
                .sorted(Comparator.comparing(Doc::getName))
                .map(d -> new DocsResponse(
                        d.getId(),
                        d.getName(),
                        d.getDay().getName(),
                        d.getRole().getName(),
                        d.getSigned()
                ))
        );
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/events/event/update")
    public ResponseEntity<?> update(@Valid @RequestBody EventRequest request) {
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

        for (Doc doc : docRepo.findAllById(event.getDocs().stream()
                .filter(d -> !request.getDocIds().contains(d.getId()))
                .map(Doc::getId)
                .collect(Collectors.toList()))) {
            doc.getEvents().remove(event);
            docRepo.saveAndFlush(doc);
        }
        for (Doc doc : docRepo.findAllById(request.getDocIds().stream()
                .filter(id -> event.getDocs().stream().noneMatch(d-> d.getId().equals(id)))
                .collect(Collectors.toList()))) {
            doc.getEvents().add(event);
            docRepo.saveAndFlush(doc);
        }

        return ResponseEntity.ok(200);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/events/event/create")
    public ResponseEntity<?> store(@Valid @RequestBody EventRequest request) {
        Event event = new Event(
            request.getName(),
            userRepo.findAll().stream()
                .filter(u -> request.getParticipantIds().contains(u.getId()))
                .collect(Collectors.toSet())
        );
        eventRepo.saveAndFlush(event);

        eventDayRepo.saveAll(Arrays.asList(
            new EventDay(event, dayRepo.findByKey("c-2"), request.getStartDate()),
            new EventDay(event, dayRepo.findByKey("c-1"), incrementDay(request.getStartDate())),
            new EventDay(event, dayRepo.findByKey("c1"), request.getC1Date()),
            new EventDay(event, dayRepo.findByKey("c2"), incrementDay(request.getC1Date())),
            new EventDay(event, dayRepo.findByKey("c+1"), request.getCplus1Date()),
            new EventDay(event, dayRepo.findByKey("c+2"), request.getFinishDate())
        ));

        for (Doc doc: docRepo.findAllById(request.getDocIds())) {
            doc.getEvents().add(event);
            docRepo.saveAndFlush(doc);
        }

        return ResponseEntity.ok(200);
    }

    private Date incrementDay(Date date) { // TODO: убрать куда-нибудь
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, 1);
        return c.getTime();
    }
}

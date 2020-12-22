package org.docs.controllers;

import org.docs.db.ERole;
import org.docs.db.entities.Doc;
import org.docs.db.entities.Event;
import org.docs.db.entities.User;
import org.docs.db.repos.*;
import org.docs.payload.request.IdsRequest;
import org.docs.payload.request.DocRequest;
import org.docs.payload.response.*;
import org.docs.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Comparator;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class DocController {
    @Autowired
    private DocRepo docRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private DayRepo dayRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;

    @GetMapping("/docs")
    public ResponseEntity<?> index() {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).get();

        return ResponseEntity.ok(
            docRepo.findAll().stream()
                .filter(d -> user.getRole().getERole() == ERole.ROLE_ADMIN ||
                        d.getEvents().stream()
                                .anyMatch(e -> e.getUsers().stream()
                                        .anyMatch(u -> u.getId().equals(user.getId()) && d.getRole() == u.getRole())))
//                .sorted(Comparator.comparing(
//                        d -> d.getEvents().stream()
//                                .map(Event::getName)
//                                .collect(Collectors.joining(",")))
//                )
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

    @GetMapping("/docs/doc")
    public ResponseEntity<?> show(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Doc doc = docRepo.findById(id).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                doc.getEvents().stream().noneMatch(e -> e.getUsers().stream()
                        .anyMatch(u -> u.getId().equals(user.getId()) && doc.getRole() == u.getRole())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            new DocResponse(
                doc.getName(),
                doc.getDay(),
                doc.getContent(),
                doc.getRole(),
                doc.getSigned(),
                doc.getPIN()
            )
        );
    }

    @Secured({"ROLE_ADMIN", "ROLE_EXPERT"})
    @GetMapping("/docs/doc/downloadPermission")
    public ResponseEntity<?> checkDownloadPermission(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Doc doc = docRepo.findById(id).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                doc.getEvents().stream().noneMatch(e -> e.getUsers().stream()
                        .anyMatch(u -> u.getId().equals(user.getId()) && doc.getRole() == u.getRole())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(true);
    }

    @Secured({"ROLE_EXPERT", "ROLE_LISTENER"})
    @GetMapping("/docs/doc/signPermission")
    public ResponseEntity<?> checkSignPermission(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Doc doc = docRepo.findById(id).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        if (user == null || doc.getEvents().stream().noneMatch(e -> e.getUsers().stream()
                .anyMatch(u -> u.getId().equals(user.getId()) && doc.getRole() == u.getRole())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(user.canSignDoc(doc));
    }

    @Secured({"ROLE_EXPERT", "ROLE_LISTENER"})
    @GetMapping("/docs/doc/sign")
    public ResponseEntity<?> signDoc(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Doc doc = docRepo.findById(id).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        if (user == null || !user.canSignDoc(doc) || doc.getEvents().stream().noneMatch(e -> e.getUsers()
                .stream().anyMatch(u -> u.getId().equals(user.getId()) && doc.getRole() == u.getRole())))
            return ResponseEntity.status(403).build();

        doc.setSigned(true);
        docRepo.saveAndFlush(doc);

        return ResponseEntity.ok(200);
    }

    @GetMapping("/docs/doc/events")
    public ResponseEntity<?> getDocEvents(@RequestParam int id) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        Doc doc = docRepo.findById(id).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        if (user == null || user.getRole().getERole() != ERole.ROLE_ADMIN &&
                doc.getEvents().stream().noneMatch(e -> e.getUsers().stream()
                        .anyMatch(u -> u.getId().equals(user.getId()) && doc.getRole() == u.getRole())))
            return ResponseEntity.status(403).build();

        return ResponseEntity.ok(
            doc.getEvents().stream()
                .filter(e -> user.getRole().getERole() == ERole.ROLE_ADMIN ||
                        e.getUsers().stream().anyMatch(u -> u.getId().equals(user.getId())))
                .sorted(Comparator.comparing(Event::getName))
                .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/docs/doc/freeEvents")
    public ResponseEntity<?> getDocFreeEvents(@RequestBody IdsRequest request) {
        return ResponseEntity.ok(
            eventRepo.findAll().stream()
                .filter(e -> !request.getIds().contains(e.getId()))
                .sorted(Comparator.comparing(Event::getName))
                .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
        );
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/docs/doc/update")
    public ResponseEntity<?> update(@Valid @RequestBody DocRequest request) {
        Doc doc = docRepo.findById(request.getId()).orElse(null);

        if (doc == null) return ResponseEntity.badRequest().build();

        doc.setName(request.getName());
        doc.setRole(roleRepo.findById(request.getRoleId()).get());
        doc.setDay(dayRepo.findById(request.getDayId()).get());
        doc.setContent(request.getContent());
        doc.setPIN(request.getPin());
        doc.setSigned(request.getSigned());
        doc.setEvents(
            eventRepo.findAll().stream()
                .filter(e -> request.getEventIds().contains(e.getId()))
                .collect(Collectors.toSet())
        );
        docRepo.saveAndFlush(doc);

        return ResponseEntity.ok(200);
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/docs/doc/create")
    public ResponseEntity<?> store(@Valid @RequestBody DocRequest request) {
        Doc doc = new Doc(
            request.getName(),
            request.getContent(),
            roleRepo.findById(request.getRoleId()).get(),
            dayRepo.findById(request.getDayId()).get(),
            request.getPin(),
            request.getSigned(),
            eventRepo.findAll().stream()
                    .filter(e -> request.getEventIds().contains(e.getId()))
                    .collect(Collectors.toSet())
        );
        docRepo.saveAndFlush(doc);

        return ResponseEntity.ok(200);
    }
}

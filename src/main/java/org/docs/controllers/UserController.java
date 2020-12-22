package org.docs.controllers;

import org.docs.db.entities.Event;
import org.docs.db.entities.User;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.RoleRepo;
import org.docs.db.repos.UserRepo;
import org.docs.payload.request.IdsRequest;
import org.docs.payload.request.UpdateProfileRequest;
import org.docs.payload.request.UpdateUserRequest;
import org.docs.payload.response.*;
import org.docs.security.JwtUtils;
import org.docs.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("profile")
    public User showProfile() {
        return userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
    }

    @PutMapping("profile/update")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest updateUserRequest) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);

        String validationMessage = updateUserRequest.validate(userRepo, user, encoder);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setEmail(updateUserRequest.getEmail());
        user.setFirstName(updateUserRequest.getFirstName());
        user.setLastName(updateUserRequest.getLastName());
        user.setCountry(updateUserRequest.getCountry());
        user.setAbout(updateUserRequest.getAbout());
        if (updateUserRequest.getPassword() != null && !updateUserRequest.getPassword().equals(""))
            user.setPassword(encoder.encode(updateUserRequest.getPassword()));

        userRepo.saveAndFlush(user);

        return ResponseEntity.ok(new JwtResponse(jwtUtils.generateJwtToken(user.getEmail()),
            user.getId(),
            user.getFirstName(),
            user.getEmail(),
            null
        ));
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/users")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(
            userRepo.findAll().stream()
                .sorted(Comparator.comparing(User::getFullName).thenComparing(u -> u.getRole().getName()))
                .map(u -> new UsersResponse(
                    u.getId(),
                    u.getEmail(),
                    u.getFullName(),
                    u.getRole().getName(),
                    u.getCountry(),
                    u.getConfirmed()
                ))
        );
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/users/user")
    public ResponseEntity<?> show(@RequestParam int id) {
        User user = userRepo.findById(id).orElse(null);

        if (user == null) return ResponseEntity.status(404).build();

        return ResponseEntity.ok(
            new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole().getId(),
                user.getCountry(),
                user.getAbout(),
                user.getPIN(),
                user.getConfirmed()
            )
        );
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/users/user/events")
    public ResponseEntity<?> getUserEvents(@RequestParam int id) {
        User user = userRepo.findById(id).orElse(null);
        if (user == null) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(
            user.getEvents().stream()
                .sorted(Comparator.comparing(Event::getName))
                .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
        );
    }

    @Secured("ROLE_ADMIN")
    @PostMapping("/users/user/freeEvents")
    public ResponseEntity<?> getUserFreeEvents(@RequestBody IdsRequest request) {
        return ResponseEntity.ok(
            eventRepo.findAll().stream()
                .filter(e -> !request.getIds().contains(e.getId()))
                .sorted(Comparator.comparing(Event::getName))
                .map(e -> new EventsResponse(e.getId(), e.getName(), e.getDates(), e.getUsers().size()))
        );
    }

    @Secured("ROLE_ADMIN")
    @PutMapping("/users/user/update")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateUserRequest request) {
        User user = userRepo.findById(request.getId()).orElse(null);
        if (user == null) return ResponseEntity.status(404).build();

        String validationMessage = request.validate(userRepo, roleRepo, user);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(roleRepo.findById(request.getRoleId()).get());
        user.setCountry(request.getCountry());
        user.setAbout(request.getAbout());
        user.setPIN(request.getPin());
        user.setConfirmed(request.getConfirmed());
        userRepo.saveAndFlush(user);

        for (Event event : eventRepo.findAllById(user.getEvents().stream()
                .filter(e -> !request.getEventIds().contains(e.getId()))
                .map(Event::getId)
                .collect(Collectors.toList()))) {
            event.getUsers().remove(user);
            eventRepo.saveAndFlush(event);
        }
        for (Event event: eventRepo.findAllById(request.getEventIds().stream()
                .filter(id -> user.getEvents().stream().noneMatch(d-> d.getId().equals(id)))
                .collect(Collectors.toList()))) {
            event.getUsers().add(user);
            eventRepo.saveAndFlush(event);
        }

        return ResponseEntity.ok(200);
    }
}

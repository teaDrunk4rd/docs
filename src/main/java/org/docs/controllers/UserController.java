package org.docs.controllers;

import org.docs.db.entities.User;
import org.docs.db.repos.UserRepo;
import org.docs.payload.request.UpdateUserRequest;
import org.docs.payload.response.JwtResponse;
import org.docs.payload.response.MessageResponse;
import org.docs.security.JwtUtils;
import org.docs.security.UserDetailsGetter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class UserController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private UserDetailsGetter userDetailsGetter;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("profiles")
    public User show() {
        return userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
    }

    @PutMapping("profiles/update")
    public ResponseEntity<?> update(@Valid @RequestBody UpdateUserRequest updateUserRequest) {
        User user = userRepo.findById(userDetailsGetter.getUserDetails().getId()).orElse(null);
        if (user == null) return ResponseEntity.status(404).body("Пользователь не найден");

        String validationMessage = updateUserRequest.validate(userRepo, user, encoder);
        if (validationMessage != null) return ResponseEntity.badRequest().body(new MessageResponse(validationMessage));

        user.setEmail(updateUserRequest.getEmail());
        user.setFirstName(updateUserRequest.getFirstName());
        user.setLastName(updateUserRequest.getLastName());
        user.setCountry(updateUserRequest.getCountry());
        user.setAbout(updateUserRequest.getAbout());
        if (updateUserRequest.getPassword() != null && updateUserRequest.getPassword() != "") {
            user.setPassword(encoder.encode(updateUserRequest.getPassword()));
        }

        userRepo.saveAndFlush(user);

        return ResponseEntity.ok(new JwtResponse(jwtUtils.generateJwtToken(user.getEmail()),
                user.getId(),
                user.getFirstName(),
                user.getEmail(),
                null));
    }
}

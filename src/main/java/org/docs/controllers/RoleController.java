package org.docs.controllers;

import org.docs.db.repos.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/")
public class RoleController {
    @Autowired
    private RoleRepo roleRepo;

    @Secured("ROLE_ADMIN")
    @GetMapping("/roles")
    public ResponseEntity<?> index() {
        return ResponseEntity.ok(roleRepo.findAll());
    }
}

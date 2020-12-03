package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Event;
import org.docs.db.entities.User;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.RoleRepo;
import org.docs.db.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class UsersSeeder implements Seeder {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run() {
        if (userRepo.count() == 0) {
            Set<Event> events = new HashSet<>();
            eventRepo.findAll().iterator().forEachRemaining(events::add);
            userRepo.saveAll(Arrays.asList(
                new User("admin", "admin", "admin@m.ru", encoder.encode("123"), roleRepo.findByKey("admin")),
                new User("expert", "1", "expert1@m.ru", encoder.encode("123"), roleRepo.findByKey("expert"), events),
                new User("expert", "2", "expert2@m.ru", encoder.encode("123"), roleRepo.findByKey("expert")),
                new User("listener", "1", "listener2@m.ru", encoder.encode("123"), roleRepo.findByKey("listener"), events),
                new User("listener", "2", "listener2@m.ru", encoder.encode("123"), roleRepo.findByKey("listener"))
            ));
        }
    }
}
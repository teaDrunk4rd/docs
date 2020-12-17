package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Event;
import org.docs.db.entities.User;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class EventsSeeder implements Seeder {
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private UserRepo userRepo;

    @Override
    public void run() {
        if (eventRepo.count() == 0) {
            Set<User> users = new HashSet<>(Arrays.asList(
                userRepo.findByEmail("expert1@m.ru"),
                userRepo.findByEmail("listener1@m.ru"))
            );

            eventRepo.saveAll(Arrays.asList(
                new Event("event1", users),
                new Event("event2", users),
                new Event("event3", users),
                new Event("event4", users),
                new Event("event5", users),
                new Event("event6", users)
            ));
        }
    }
}
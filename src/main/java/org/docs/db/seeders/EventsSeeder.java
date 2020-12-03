package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Event;
import org.docs.db.repos.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class EventsSeeder implements Seeder {
    @Autowired
    private EventRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Event("event1"),
                new Event("event2"),
                new Event("event3"),
                new Event("event4"),
                new Event("event5"),
                new Event("event6")
            ));
        }
    }
}
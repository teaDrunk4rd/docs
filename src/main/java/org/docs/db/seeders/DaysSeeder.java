package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Day;
import org.docs.db.repos.DayRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DaysSeeder implements Seeder {
    @Autowired
    private DayRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Day("C-2", "c-2"),
                new Day("C-1", "c-1"),
                new Day("C1",   "c1"),
                new Day("C2",   "c2"),
                new Day("C+1", "c+1"),
                new Day("C+2", "c+2")
            ));
        }
    }
}
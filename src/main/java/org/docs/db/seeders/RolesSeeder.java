package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Role;
import org.docs.db.repos.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class RolesSeeder implements Seeder {
    @Autowired
    private RoleRepo repo;

    @Override
    public void run() {
        if (repo.count() == 0) {
            repo.saveAll(Arrays.asList(
                new Role("Админ", "admin"),
                new Role("Эксперт", "expert"),
                new Role("Слушатель", "listener")
            ));
        }
    }
}
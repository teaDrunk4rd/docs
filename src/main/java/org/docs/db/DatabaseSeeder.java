package org.docs.db;

import org.docs.db.seeders.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class DatabaseSeeder {
    @Autowired
    private DaysSeeder daysSeeder;
    @Autowired
    private RolesSeeder rolesSeeder;
    @Autowired
    private DocsSeeder docsSeeder;
    @Autowired
    private EventsSeeder eventsSeeder;
    @Autowired
    private EventDaysSeeder eventDaysSeeder;
    @Autowired
    private UsersSeeder usersSeeder;

    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) throws ParseException {
        daysSeeder.run();
        rolesSeeder.run();

        eventsSeeder.run();
        docsSeeder.run();
        usersSeeder.run();
        eventDaysSeeder.run();
    }
}
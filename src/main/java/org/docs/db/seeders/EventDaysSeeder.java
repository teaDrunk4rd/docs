package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.EventDay;
import org.docs.db.repos.DayRepo;
import org.docs.db.repos.EventDayRepo;
import org.docs.db.repos.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Component
public class EventDaysSeeder implements Seeder {
    @Autowired
    private EventDayRepo eventDayRepo;
    @Autowired
    private EventRepo eventRepo;
    @Autowired
    private DayRepo dayRepo;

    @Override
    public void run() throws ParseException {
        if (eventDayRepo.count() == 0) {
            SimpleDateFormat ft = new SimpleDateFormat("dd/MM/yyyy");
            eventDayRepo.saveAll(Arrays.asList(
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c-2"), ft.parse("03/12/2020")),
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c-1"), ft.parse("04/12/2020")),
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c1"), ft.parse("05/12/2020")),
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c2"), ft.parse("06/12/2020")),
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c+1"), ft.parse("07/12/2020")),
                new EventDay(eventRepo.findByName("event1"), dayRepo.findByKey("c+2"), ft.parse("08/12/2020")),

                new EventDay(eventRepo.findByName("event2"), dayRepo.findByKey("c+2"), ft.parse("05/12/2020"))
            ));
        }
    }
}
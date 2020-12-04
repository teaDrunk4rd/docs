package org.docs.db.seeders;

import org.docs.db.Seeder;
import org.docs.db.entities.Doc;
import org.docs.db.entities.Event;
import org.docs.db.repos.DayRepo;
import org.docs.db.repos.DocRepo;
import org.docs.db.repos.EventRepo;
import org.docs.db.repos.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DocsSeeder implements Seeder {
    @Autowired
    private DocRepo docRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private DayRepo dayRepo;
    @Autowired
    private EventRepo eventRepo;

    @Override
    public void run() {
        if (docRepo.count() == 0) {
            Set<Event> events = new HashSet<>();
            eventRepo.findAll().iterator().forEachRemaining(events::add);

            docRepo.saveAll(Arrays.asList(
                new Doc("doc1", "some content1", roleRepo.findByKey("expert"), dayRepo.findByKey("c-2"), events.stream().skip(2).limit(2).collect(Collectors.toSet())),
                new Doc("doc2", "some content2", roleRepo.findByKey("expert"), dayRepo.findByKey("c-1"), events.stream().limit(2).collect(Collectors.toSet())),
                new Doc("doc3", "some content3", roleRepo.findByKey("listener"), dayRepo.findByKey("c1")),

                new Doc("doc4", "some content4", roleRepo.findByKey("listener"), dayRepo.findByKey("c-2")),
                new Doc("doc5", "some content5", roleRepo.findByKey("expert"), dayRepo.findByKey("c-1")),

                new Doc("doc6", "some content6", roleRepo.findByKey("expert"), dayRepo.findByKey("c-2"))
            ));
        }
    }
}
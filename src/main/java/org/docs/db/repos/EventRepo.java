package org.docs.db.repos;

import org.docs.db.entities.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepo extends CrudRepository<Event, Integer> {
    Event findByName(String name);

    void saveAndFlush(Event event);

    @Override
    List<Event> findAll();
}
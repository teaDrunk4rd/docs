package org.docs.db.repos;

import org.docs.db.entities.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventRepo extends CrudRepository<Event, Integer> {
    Event findByName(String name);
}
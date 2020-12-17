package org.docs.db.repos;

import org.docs.db.entities.Event;
import org.docs.db.entities.EventDay;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EventDayRepo extends CrudRepository<EventDay, Integer> {
    @Transactional
    List<EventDay> deleteByEvent(Event event);
}
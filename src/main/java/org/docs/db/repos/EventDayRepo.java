package org.docs.db.repos;

import org.docs.db.entities.EventDay;
import org.springframework.data.repository.CrudRepository;

public interface EventDayRepo extends CrudRepository<EventDay, Integer> {
}
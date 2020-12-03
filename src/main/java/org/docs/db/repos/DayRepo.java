package org.docs.db.repos;

import org.docs.db.entities.Day;
import org.springframework.data.repository.CrudRepository;

public interface DayRepo extends CrudRepository<Day, Integer> {
    Day findByKey(String key);
}
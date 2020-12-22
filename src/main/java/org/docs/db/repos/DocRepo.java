package org.docs.db.repos;

import org.docs.db.entities.Doc;
import org.docs.db.entities.Event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DocRepo extends CrudRepository<Doc, Integer> {
    void saveAndFlush(Doc doc);

    @Transactional
    List<Doc> deleteByEvents(List<Event> event);

    @Override
    List<Doc> findAll();
}
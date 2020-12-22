package org.docs.db.repos;

import org.docs.db.entities.Doc;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DocRepo extends CrudRepository<Doc, Integer> {
    void saveAndFlush(Doc doc);

    @Override
    List<Doc> findAll();
}
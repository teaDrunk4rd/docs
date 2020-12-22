package org.docs.db.repos;

import org.docs.db.entities.Doc;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DocRepo extends CrudRepository<Doc, Integer> {
    @Override
    List<Doc> findAll();

    void saveAndFlush(Doc doc);
}
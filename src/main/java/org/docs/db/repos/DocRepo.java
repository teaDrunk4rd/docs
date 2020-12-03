package org.docs.db.repos;

import org.docs.db.entities.Doc;
import org.springframework.data.repository.CrudRepository;

public interface DocRepo extends CrudRepository<Doc, Integer> {
}
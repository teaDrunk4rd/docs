package org.docs.db.repos;

import org.docs.db.entities.File;
import org.springframework.data.repository.CrudRepository;

public interface FileRepo extends CrudRepository<File, Integer> {
}
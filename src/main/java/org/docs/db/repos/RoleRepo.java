package org.docs.db.repos;

import org.docs.db.entities.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepo extends CrudRepository<Role, Integer> {
    Role findByKey(String key);
}
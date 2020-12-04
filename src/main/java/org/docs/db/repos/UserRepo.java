package org.docs.db.repos;

import org.docs.db.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    void saveAndFlush(User user);
}
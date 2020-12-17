package org.docs.db.repos;

import org.docs.db.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepo extends CrudRepository<User, Integer> {
    User findByEmail(String email);

    void saveAndFlush(User user);

    @Override
    List<User> findAll();
}
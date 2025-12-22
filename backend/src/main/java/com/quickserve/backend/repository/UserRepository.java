
package com.quickserve.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.quickserve.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}

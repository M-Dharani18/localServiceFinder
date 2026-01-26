package com.quickserve.backend.repository;

import com.quickserve.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findByEmail(String email);

    // ✅ Add these methods for admin statistics

    // Find users by role
    List<User> findByRole(String role);

    // Count users by role
    Long countByRole(String role);

    // In UserRepository.java, add these methods:

    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate")
    Long countUsersSince(@Param("startDate") LocalDateTime startDate);





}
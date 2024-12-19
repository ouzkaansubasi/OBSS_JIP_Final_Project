package com.example.marketplace.repository;

import com.example.marketplace.model.BlackList;
import com.example.marketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlackListRepository extends JpaRepository<BlackList, Long> {
    Optional<BlackList> findByUser(User user);
}

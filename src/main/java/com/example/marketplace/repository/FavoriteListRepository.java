package com.example.marketplace.repository;

import com.example.marketplace.model.FavoriteList;
import com.example.marketplace.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {
    Optional<FavoriteList> findByUser(User user);
}

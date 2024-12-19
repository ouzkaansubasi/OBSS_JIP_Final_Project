package com.example.marketplace.controller;

import com.example.marketplace.service.FavoriteListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteListController {

    private final FavoriteListService favoriteListService;

    @PostMapping("/{userId}/products/{productId}")
    public ResponseEntity<Void> addProductToFavorites(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteListService.addProductToFavorites(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/products/{productId}")
    public ResponseEntity<Void> removeProductFromFavorites(@PathVariable Long userId, @PathVariable Long productId) {
        favoriteListService.removeProductFromFavorites(userId, productId);
        return ResponseEntity.noContent().build();
    }
}


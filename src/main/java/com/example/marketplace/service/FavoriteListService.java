package com.example.marketplace.service;

import com.example.marketplace.dto.ProductDTO;

public interface FavoriteListService {
    void addProductToFavorites(Long userId, Long productId);
    void removeProductFromFavorites(Long userId, Long productId);
}

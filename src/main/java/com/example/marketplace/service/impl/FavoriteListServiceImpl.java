package com.example.marketplace.service.impl;

import com.example.marketplace.model.FavoriteList;
import com.example.marketplace.model.Product;
import com.example.marketplace.model.User;
import com.example.marketplace.repository.FavoriteListRepository;
import com.example.marketplace.repository.ProductRepository;
import com.example.marketplace.repository.UserRepository;
import com.example.marketplace.service.FavoriteListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteListServiceImpl implements FavoriteListService {

    private final FavoriteListRepository favoriteListRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public void addProductToFavorites(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));


        FavoriteList favoriteList = favoriteListRepository.findByUser(user)
                .orElseGet(() -> {
                    FavoriteList newFavoriteList = new FavoriteList(user);
                    favoriteListRepository.save(newFavoriteList);
                    return newFavoriteList;
                });

        favoriteList.addProduct(product);
        favoriteListRepository.save(favoriteList);
    }

    @Override
    public void removeProductFromFavorites(Long userId, Long productId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        FavoriteList favoriteList = favoriteListRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Favorite list not found"));

        favoriteList.removeProduct(product);
        favoriteListRepository.save(favoriteList);
    }
}


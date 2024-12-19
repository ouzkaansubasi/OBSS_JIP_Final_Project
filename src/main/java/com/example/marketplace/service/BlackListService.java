package com.example.marketplace.service;

public interface BlackListService {
    void addSellerToBlackList(Long userId, Long sellerId);
    void removeSellerFromBlackList(Long userId, Long sellerId);
}

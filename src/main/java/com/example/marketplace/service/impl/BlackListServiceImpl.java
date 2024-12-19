package com.example.marketplace.service.impl;

import com.example.marketplace.model.BlackList;
import com.example.marketplace.model.Seller;
import com.example.marketplace.model.User;
import com.example.marketplace.repository.BlackListRepository;
import com.example.marketplace.repository.SellerRepository;
import com.example.marketplace.repository.UserRepository;
import com.example.marketplace.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BlackListServiceImpl implements BlackListService {

    private final BlackListRepository blackListRepository;
    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void addSellerToBlackList(Long userId, Long sellerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        BlackList blackList = blackListRepository.findByUser(user)
                .orElseGet(() -> {
                    BlackList newBlackList = new BlackList();
                    newBlackList.setUser(user);
                    return blackListRepository.save(newBlackList);
                });

        blackList.addSeller(seller);
        blackListRepository.save(blackList);
    }

    @Override
    @Transactional
    public void removeSellerFromBlackList(Long userId, Long sellerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        BlackList blackList = blackListRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Blacklist not found"));

        blackList.removeSeller(seller);
        blackListRepository.save(blackList);
    }
}

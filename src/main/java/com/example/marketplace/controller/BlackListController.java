package com.example.marketplace.controller;

import com.example.marketplace.service.BlackListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blacklist")
@RequiredArgsConstructor
public class BlackListController {

    private final BlackListService blackListService;

    @PostMapping("/{userId}/sellers/{sellerId}")
    public ResponseEntity<Void> addSellerToBlackList(@PathVariable Long userId, @PathVariable Long sellerId) {
        blackListService.addSellerToBlackList(userId, sellerId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/sellers/{sellerId}")
    public ResponseEntity<Void> removeSellerFromBlackList(@PathVariable Long userId, @PathVariable Long sellerId) {
        blackListService.removeSellerFromBlackList(userId, sellerId);
        return ResponseEntity.ok().build();
    }
}




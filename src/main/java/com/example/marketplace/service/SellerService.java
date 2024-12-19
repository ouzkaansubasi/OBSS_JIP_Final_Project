package com.example.marketplace.service;

import com.example.marketplace.dto.SellerDTO;

import java.util.List;

public interface SellerService {
    SellerDTO createSeller(SellerDTO sellerDTO);
    void deleteSeller(Long id);
    List<SellerDTO> getAllSellers();
    SellerDTO getSellerById(Long id);
}

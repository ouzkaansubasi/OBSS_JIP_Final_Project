package com.example.marketplace.service.impl;

import com.example.marketplace.dto.SellerDTO;
import com.example.marketplace.model.Seller;
import com.example.marketplace.repository.SellerRepository;
import com.example.marketplace.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;

    @Override
    public SellerDTO createSeller(SellerDTO sellerDTO) {
        Seller seller = Seller.builder()
                .name(sellerDTO.getName())
                .email(sellerDTO.getEmail())
                .build();
        Seller savedSeller = sellerRepository.save(seller);
        return new SellerDTO(savedSeller.getId(), savedSeller.getName(), savedSeller.getEmail());
    }

    @Override
    public void deleteSeller(Long id) {
        sellerRepository.deleteById(id);
    }

    @Override
    public List<SellerDTO> getAllSellers() {
        return sellerRepository.findAll().stream()
                .map(seller -> new SellerDTO(seller.getId(), seller.getName(), seller.getEmail()))
                .collect(Collectors.toList());
    }

    @Override
    public SellerDTO getSellerById(Long id) {
        Seller seller = sellerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        return new SellerDTO(seller.getId(), seller.getName(), seller.getEmail());
    }
}

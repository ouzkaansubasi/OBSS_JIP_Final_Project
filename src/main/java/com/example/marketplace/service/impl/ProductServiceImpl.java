package com.example.marketplace.service.impl;

import com.example.marketplace.dto.ProductDTO;
import com.example.marketplace.model.Product;
import com.example.marketplace.model.Seller;
import com.example.marketplace.repository.ProductRepository;
import com.example.marketplace.repository.SellerRepository;
import com.example.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final SellerRepository sellerRepository;

    @Override
    public ProductDTO saveProduct(ProductDTO productDTO) {
        Seller seller = sellerRepository.findById(productDTO.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setSeller(seller);

        Product savedProduct = productRepository.save(product);
        return new ProductDTO(savedProduct.getId(), savedProduct.getName(), savedProduct.getPrice(), savedProduct.getDescription(), savedProduct.getSeller().getId());
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getSeller().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getSeller().getId());
    }
}

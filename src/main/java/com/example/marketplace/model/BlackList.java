package com.example.marketplace.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlackList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @ManyToMany
    @JoinTable(
            name = "blacklist_sellers",
            joinColumns = @JoinColumn(name = "blacklist_id"),
            inverseJoinColumns = @JoinColumn(name = "seller_id")
    )
    private Set<Seller> sellers = new HashSet<>();

    public void addSeller(Seller seller) {
        this.sellers.add(seller);
    }

    public void removeSeller(Seller seller) {
        this.sellers.remove(seller);
    }
}




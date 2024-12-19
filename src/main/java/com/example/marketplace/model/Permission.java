package com.example.marketplace.model;

import org.springframework.security.core.GrantedAuthority;

public enum Permission implements GrantedAuthority {
    ADMIN_READ,
    ADMIN_UPDATE,
    ADMIN_DELETE,
    ADMIN_CREATE,
    USER_READ,
    USER_UPDATE,
    USER_DELETE,
    USER_CREATE;

    @Override
    public String getAuthority() {
        return this.name();
    }
}

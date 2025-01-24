package com.cassinanasclinic.fullstack_backend_psy.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {

    private Map<String, String> userSessions = new HashMap<>(); // Simple session store

    public void createSession(String token, String username) {
        userSessions.put(token, username);
    }

    public String getUsernameFromToken(String token) {
        return userSessions.get(token);
    }

    public void removeSession(String token) {
        userSessions.remove(token);
    }
}

package com.cassinanasclinic.fullstack_backend_psy.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cassinanasclinic.fullstack_backend_psy.model.LoginRequest;
import com.cassinanasclinic.fullstack_backend_psy.model.User;
import com.cassinanasclinic.fullstack_backend_psy.repository.UserRepository;
import com.cassinanasclinic.fullstack_backend_psy.service.TokenService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "Authorization")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            String token = UUID.randomUUID().toString();
            tokenService.createSession(token, user.getUsername());
            return ResponseEntity.ok().header("Authorization", token).body("Logged in successfully");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
    
    @PostMapping("/create-user")
    public ResponseEntity<?> createNewUser(@RequestBody User newUser){
    	User user = userRepository.findByUsername(newUser.getUsername());
    	if(user !=null) {
    		return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario já existente");
    	}  	
    	userRepository.save(newUser);
    	return ResponseEntity.status(HttpStatus.ACCEPTED).body("Usuario criado com sucesso");
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        tokenService.removeSession(token);
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/current-user")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        String username = tokenService.getUsernameFromToken(token);
        if (username != null) {
            return ResponseEntity.ok(username);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
    }
    
    @GetMapping("/user-pacients")
    public ResponseEntity<?> getPacientsFromUser(@RequestHeader("Authorization") String token){
    	String username = tokenService.getUsernameFromToken(token);
    	if(username != null) {
    		return ResponseEntity.ok().body(userRepository.findPacientsByUsername(username));
    	}
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
    }
    
    /*@GetMapping("/user-pacients-test")
    public ResponseEntity<?> getPacientsFromUserTest(@RequestParam String username1){
    	String username = username1;
    	if(username != null) {
    		return ResponseEntity.ok().body(userRepository.findPacientsByUsername(username));
    	}
    	return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
    }*/
    
    
}

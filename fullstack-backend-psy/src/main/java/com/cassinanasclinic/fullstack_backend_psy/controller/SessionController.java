package com.cassinanasclinic.fullstack_backend_psy.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.service.PacientService;
import com.cassinanasclinic.fullstack_backend_psy.service.SessionService;
import com.cassinanasclinic.fullstack_backend_psy.service.TokenService;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {
	
	@Autowired
	SessionService sessionService;
	
	@Autowired
	TokenService tokenService;
	
	@Autowired
	PacientService pacientService;
	
	@GetMapping("/sessions")
	public ResponseEntity<?> getAllSessions(@RequestParam(required=false) String sortBy,
			@RequestParam(required=false) String direction){		
		Sort sort = Sort.unsorted();
		if(sortBy != null) {
			sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction), sortBy);
		}
		List<Session> sessions = sessionService.getAllSessions(sort);
		return ResponseEntity.ok(sessions);
	}
	
	@GetMapping("/session/{id}")
	public ResponseEntity<?> getSessionById(@PathVariable Long id){
		Optional<Session> session = sessionService.getSessionById(id);
		
		return session.map(ResponseEntity::ok)
                .orElseThrow(() -> new PacientNotFoundException(id));
	}
	
	@GetMapping("/pacientSessionsList/{id}")
	public ResponseEntity<?> getSessionsByPacientId(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestParam(required=false) String sortBy,
			@RequestParam(required=false) String direction){
		
		if(!authFunction(token, id)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
		}
		Sort sort = Sort.unsorted();
		if(sortBy != null) {
			sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction), sortBy);
		}
		 List<Session> sessions = sessionService.getSessionsByClientId(id, sort);
		    
		    return ResponseEntity.ok(sessions);
	}
	
	@PutMapping("/edit/sesssion/{input}")
	public ResponseEntity<?> editSession(@RequestBody(required=true) Session session, @PathVariable Long id){
		sessionService.updateSession(id, session);
		return ResponseEntity.ok("Session Updated Succesfully");
	}
	
	@PutMapping("/sessionPaymentStatus/{id}")
	public ResponseEntity<?> updatePaymentStatus(@RequestBody(required=true) Map<String, Boolean> payload, 
			@PathVariable Long id){
		Boolean paid = payload.get("paid");
		sessionService.updateSessionPaidStatus(id, paid);
		
		return ResponseEntity.ok("PaymentStatus updated");
	}
	
	@DeleteMapping("/session/delete/{id}")
	public ResponseEntity<?> deleteSession(@PathVariable Long id){
		sessionService.deleteSessionById(id);
		return ResponseEntity.ok("Session Deleted Successfully");
	}
	
	public Boolean authFunction(String token, Long id) {
		String username = tokenService.getUsernameFromToken(token);

	    Optional<Pacient> pacientOptional = pacientService.findPacientById(id);

	    if (pacientOptional.isEmpty()) {
	        return false;
	    }

	    Pacient pacient = pacientOptional.get();

	    if (!username.equals(pacient.getUser().getUsername())) {
	        return false;
	    }
	    
	    return true;
	}
	

}

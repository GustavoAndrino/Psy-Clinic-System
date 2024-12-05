package com.cassinanasclinic.fullstack_backend_psy.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.service.SessionService;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {
	
	@Autowired
	SessionService sessionService;
	
	@GetMapping("/sessions")
	public ResponseEntity<?> getAllSessions(){
		List<Session> sessions = sessionService.getAllSessions();
		return ResponseEntity.ok(sessions);
	}
	
	@GetMapping("/session/{id}")
	public ResponseEntity<?> getSessionById(@PathVariable Long id){
		Optional<Session> session = sessionService.getSessionById(id);
		
		return session.map(ResponseEntity::ok)
                .orElseThrow(() -> new PacientNotFoundException(id));
	}
	
	@GetMapping("/pacientSessionsList/{id}")
	public ResponseEntity<?> getSessionsByPacientId(@PathVariable Long id){
		 List<Session> sessions = sessionService.getSessionsByClientId(id);
		    
		    return ResponseEntity.ok(sessions);
	}
	
	@PutMapping("/edit/sesssion/{input}")
	public ResponseEntity<?> editSession(@RequestBody(required=true) Session session, @PathVariable Long id){
		sessionService.updateSession(id, session);
		return ResponseEntity.ok("Session Updated Succesfully");
	}
	
	@PutMapping("/sesssionPaymentStatus/{id}")
	public ResponseEntity<?> updatePaymentStatus(@RequestBody(required=true) Boolean paid, 
			@PathVariable Long id){
		sessionService.updateSessionPaidStatus(id, paid);
		
		return ResponseEntity.ok("PaymentStatus updated");
	}
	
	@DeleteMapping("/session/delete/{id}")
	public ResponseEntity<?> deleteSession(@PathVariable Long id){
		sessionService.deleteSessionById(id);
		return ResponseEntity.ok("Session Deleted Successfully");
	}
	

}

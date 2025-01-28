package com.cassinanasclinic.fullstack_backend_psy.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.service.PacientService;
import com.cassinanasclinic.fullstack_backend_psy.service.TokenService;

import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PacientController {
	
	@Autowired
	PacientService pacientService;
	
	@Autowired
	TokenService tokenService;
	
	@GetMapping("/pacientName")
	public ResponseEntity<?> getPacientByName (@RequestParam(required=false) String input, 
			@RequestParam(required=false) String sortBy, @RequestParam(required=false) String direction){	
		Sort sort = Sort.unsorted();
		if(sortBy != null) {
			sort = Sort.by(Sort.Direction.fromString(direction == null ? "ASC" : direction), sortBy);
		}
		List<Pacient> allPacients;
		allPacients = pacientService.findPacientByNameContaining(input, sort);
		return ResponseEntity.ok(allPacients);
	}
	
	@GetMapping("/pacientById/{id}")
	public ResponseEntity<?> pacientById(@RequestHeader("Authorization") String token, 
			@PathVariable Long id){
		    String username = tokenService.getUsernameFromToken(token);

		    Optional<Pacient> pacientOptional = pacientService.findPacientById(id);

		    if (pacientOptional.isEmpty()) {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pacient not found");
		    }

		    Pacient pacient = pacientOptional.get();

		    if (!username.equals(pacient.getUser().getUsername())) {
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
		    }
		    
		    return ResponseEntity.ok(pacient);
	}
	
	@GetMapping("/pacientSessions/{id}")
	public ResponseEntity<?> getPacientSessions(@PathVariable Long id){
		List<Session> pacientSessions = pacientService.getPacientSessions(id);
		
		return ResponseEntity.ok(pacientSessions);
	}
	
	@GetMapping("/pacinetOwedValue/{id}")
	public ResponseEntity<?> getPacientOwedValue(@PathVariable Long id){
		Double owedValue = pacientService.getOwedValueByPacient(id);
		
		return ResponseEntity.ok(owedValue);
	}
	
	@PostMapping("/newPacient")
	public ResponseEntity<?> addNewPacient(@RequestHeader("Authorization") String token, 
			@RequestBody(required=true) Pacient pacient){
		
		String username = tokenService.getUsernameFromToken(token);
        if (username != null) {
        	return ResponseEntity.ok().body( pacientService.addNewPacient(username,pacient));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid session");
	}
	
	@PutMapping("/sessionToPacient/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<?> addSessionToPacient(@PathVariable Long id,
			@RequestBody (required=true)Session session){
		
		return pacientService.addNewSessionToPacient(id, session);
	}
	
	@PutMapping("/edit/pacient/{id}")
	public ResponseEntity<?> editPacient(@RequestBody(required=true) Pacient pacient, @PathVariable Long id){
		pacientService.updatePacientInfo(pacient, id);
		return ResponseEntity.ok("Pacient Updated Succesfully");
	}
	
	@DeleteMapping("/pacient/delete/{id}")
	public ResponseEntity<?> deletePacient(@PathVariable Long id){
		pacientService.deletePacientById(id);
		
		return ResponseEntity.ok("Pacient of id " + id + " was successfully deleted");
	}
	
	// Utility methods for input validation
    private boolean isNumeric(String input) {
        try {
            Long.parseLong(input);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean isValidCpf(String cpf) {
        // Simple CPF validation logic (adjust as needed)
        return cpf != null && cpf.matches("\\d{11}");
    }
    
    /*TODO FOR TESTING
    @PostMapping("/testAddPacient")
    public ResponseEntity<?> testAddNewPacient(@RequestParam String username, 
                                               @RequestBody Pacient pacient) {
        return pacientService.addNewPacient(username, pacient);
    }*/
}

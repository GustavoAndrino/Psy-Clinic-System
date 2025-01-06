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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.service.PacientService;

import jakarta.websocket.server.PathParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PacientController {
	
	@Autowired
	PacientService pacientService;
	
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
	
	//TODO see if method below can still be useful for something
	/*@GetMapping("/pacient")
	public ResponseEntity<?> getPacientBy (@RequestParam(required=false) String input){
		 Optional<Pacient> pacient;
		 List<Pacient> allPacients;
		 	if(input.isEmpty()) {
		 		allPacients = pacientService.findAllClients();
		 		return ResponseEntity.ok(allPacients);
		 	}
	        // Determine input type and call the appropriate service method
	        if (isNumeric(input)) { // Input is numeric, so it's an ID
	            pacient = pacientService.findPacientById(Long.parseLong(input));
	        } else { // Input matches CPF format
	            pacient = pacientService.findPacientByCpf(input);
	        }

	        return pacient.map(ResponseEntity::ok)
	                  .orElseThrow(() -> new PacientNotFoundException(input));
	        }*/
	
	@GetMapping("/pacientById/{id}")
	public ResponseEntity<?> pacientById(@PathVariable Long id){
		Optional<Pacient> pacient = pacientService.findPacientById(id);
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
	public ResponseEntity<?> addNewPacient(@RequestBody(required=true) Pacient pacient){
		return pacientService.addNewPacient(pacient);
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
}

package com.cassinanasclinic.fullstack_backend_psy.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
public class PacientController {
	
	@Autowired
	PacientService pacientService;
	
	@GetMapping("/pacient")
	public List<Pacient> getAllPacients(){
		return pacientService.findAllClients();
	}
	
	@GetMapping("/pacient/{input}")
	public ResponseEntity<?> getPacientBy (@PathVariable String input){
		 Optional<Pacient> pacient;

	        // Determine input type and call the appropriate service method
	        if (isNumeric(input)) { // Input is numeric, so it's an ID
	            pacient = pacientService.findPacientById(Long.parseLong(input));
	        } else if (isValidCpf(input)) { // Input matches CPF format
	            pacient = pacientService.findPacientByCpf(input);
	        } else { // Otherwise, treat it as a name
	            pacient = pacientService.findPacientByName(input);
	        }

	        return pacient.map(ResponseEntity::ok)
	                  .orElseThrow(() -> new PacientNotFoundException(input));
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
		pacientService.addNewPacient(pacient);
		return ResponseEntity.ok("New Pacient Added Succesfully");
	}
	
	@PutMapping("/edit/pacient/{input}")
	public ResponseEntity<?> editPacient(@RequestBody(required=true) Pacient pacient, @PathVariable Long id){
		pacientService.updatePacientInfo(pacient, id);
		return ResponseEntity.ok("Pacient Updated Succesfully");
	}
	
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

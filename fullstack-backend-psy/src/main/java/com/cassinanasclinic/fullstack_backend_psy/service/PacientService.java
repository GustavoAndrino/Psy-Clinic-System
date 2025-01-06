package com.cassinanasclinic.fullstack_backend_psy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.repository.PacientRepository;

import jakarta.transaction.Transactional;

@Service
public class PacientService {
	
	@Autowired
	PacientRepository pacientRepository;
	
	public List<Pacient> findAllClients(){
		return pacientRepository.findAll();
	}
	
	public List<Pacient> findPacientByNameContaining (String string, Sort sort) {
		System.out.println(string);
		return pacientRepository.findByNameStartingWithOrDependentNameStartingWith(string, sort);
	}
	
	public Optional<Pacient> findPacientById (Long id){
		return pacientRepository.findById(id);
	}
	
	public List<Session> getPacientSessions (Long id){
		Optional<Pacient> pacient = pacientRepository.findById(id);
		
		if(pacient.isPresent()) {
			return pacient.get().getSessions();
		}else {
			throw new PacientNotFoundException(id);
		}
	}
	
	public Optional<Pacient> findPacientByCpf(String cpf){
		return pacientRepository.findByCpf(cpf);
	}
	
	public ResponseEntity<?> addNewPacient(Pacient newPacient){
		Optional<Pacient> pacient = pacientRepository.findByCpf(newPacient.getCpf());
		
		if(pacient.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: este CPF já existe");
		}
		
		newPacient.getSessions().forEach(session -> session.setPacient(newPacient));
		Pacient newAddedPacient = pacientRepository.save(newPacient);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(newAddedPacient);
	}
	
	public Pacient updatePacientInfo(Pacient newPacient, Long id) {
		return pacientRepository.findById(id).map(pacient -> {
			pacient.setName(newPacient.getName());
			pacient.setDependentName(newPacient.getDependentName());
			pacient.setCpf(newPacient.getCpf());
			pacient.setDependentCpf(newPacient.getDependentCpf());
			pacient.setAdress(newPacient.getAdress());
			pacient.setCep(newPacient.getCep());
			pacient.setPhoneNumber(newPacient.getPhoneNumber());
			pacient.setEmail(newPacient.getEmail());
			return pacientRepository.save(pacient);
		}).orElseThrow(() -> new PacientNotFoundException(id));
	}
	
	public String deletePacientById(Long id) {
		if(!pacientRepository.existsById(id)) {
			throw new PacientNotFoundException(id);
		}		
		pacientRepository.deleteById(id);
		return "Paciente de id: " + id + " foi deletado";
	}
	
	public Double getOwedValueByPacient(Long id) {
		Optional<Pacient> pacient = pacientRepository.findById(id);
		if(pacient.isPresent()) {
			return pacient.get().getOwedValue();
		}else {
			throw new PacientNotFoundException(id);
		}
	}
	
	public ResponseEntity<?> addNewSessionToPacient(Long id, Session session){
		Pacient pacient = pacientRepository.getById(id);
		
		session.setPacient(pacient);

	    List<Session> sessions = pacient.getSessions();
	    sessions.add(session);
    
	    pacient.setSessions(sessions); 

	    pacientRepository.save(pacient);

	    return ResponseEntity.ok("Session added successfully!");
		
	}
}

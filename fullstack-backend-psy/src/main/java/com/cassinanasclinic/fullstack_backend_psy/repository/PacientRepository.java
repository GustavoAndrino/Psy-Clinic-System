package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;

public interface PacientRepository extends JpaRepository<Pacient, Long> {
	
	List<Pacient> findAll();
	
	Optional<Pacient> findByNameContaining(String name);
	
	Optional<Pacient> findByCpf(String cpf);
}
 
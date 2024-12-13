package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;

public interface PacientRepository extends JpaRepository<Pacient, Long> {
	
	List<Pacient> findAll();
	
	@Query("SELECT p FROM Pacient p WHERE p.name LIKE :searchTerm% OR p.dependentName LIKE :searchTerm%")
	List<Pacient> findByNameStartingWithOrDependentNameStartingWith(@Param("searchTerm") String searchTerm);

	Optional<Pacient> findByCpf(String cpf);
	
	Pacient getById(Long id);
}
 
package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;

public interface PacientRepository extends JpaRepository<Pacient, Long> {
	
	List<Pacient> findAll();
	
	@Query("SELECT p FROM Pacient p WHERE p.name LIKE :searchTerm% OR p.dependentName LIKE :searchTerm%")
	List<Pacient> findByNameStartingWithOrDependentNameStartingWith(@Param("searchTerm") String searchTerm, Sort sort);

	Optional<Pacient> findByCpf(String cpf);
	
	Pacient getById(Long id);
	
	@Query("SELECT DISTINCT p FROM Pacient p JOIN p.sessions s WHERE s.paid = FALSE AND s.date < :fourWeeksAgo")
	List<Pacient> findPatientsWithUnpaidSessionsOlderThan(@Param("fourWeeksAgo") LocalDateTime fourWeeksAgo);

}
 
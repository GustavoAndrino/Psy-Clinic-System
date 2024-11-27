package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;

public interface PacientRepository extends JpaRepository<Pacient, Long> {
	Optional<Pacient> findByName(String name);
}

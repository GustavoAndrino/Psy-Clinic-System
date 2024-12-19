package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cassinanasclinic.fullstack_backend_psy.model.Session;

public interface SessionRepository extends JpaRepository<Session, Long>{
	
	List<Session> findByPacientId(Long pacientId);
	
	
	
}

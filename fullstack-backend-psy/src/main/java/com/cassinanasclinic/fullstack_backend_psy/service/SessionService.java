package com.cassinanasclinic.fullstack_backend_psy.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cassinanasclinic.fullstack_backend_psy.exception.PacientNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.exception.SessionNotFoundException;
import com.cassinanasclinic.fullstack_backend_psy.model.Session;
import com.cassinanasclinic.fullstack_backend_psy.repository.SessionRepository;

@Service
public class SessionService {
	
	@Autowired
	SessionRepository sessionRepository;
	
	public List<Session> getAllSessions(){
		return sessionRepository.findAll();
	}
	
	public Optional<Session> getSessionById (Long id) {
		return sessionRepository.findById(id);
	}
	
	public void deleteSessionById (Long id) {
		sessionRepository.deleteById(id);
	}
	
	public Session updateSession (Long id, Session newSession) {
		return sessionRepository.findById(id).map(session -> {
			session.setDate(newSession.getDate());
			session.setPaid(newSession.getPaid());
			session.setValue(newSession.getValue());
			return sessionRepository.save(session);
		}).orElseThrow(() -> new SessionNotFoundException(id));
	}
	
	public Session updateSessionPaidStatus (Long id, Boolean paid) {
		return sessionRepository.findById(id).map(session -> {
			session.setPaid(paid);
			return sessionRepository.save(session);
		}).orElseThrow(() -> new SessionNotFoundException(id));
	}
	
	public List<Session> getSessionsByClientId(Long id) {
		return sessionRepository.findByPacientId(id);
	}
	

}

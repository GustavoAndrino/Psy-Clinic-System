package com.cassinanasclinic.fullstack_backend_psy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cassinanasclinic.fullstack_backend_psy.repository.SessionRepository;

@Service
public class SessionService {
	
	@Autowired
	SessionRepository sessionRepository;
	
	
}

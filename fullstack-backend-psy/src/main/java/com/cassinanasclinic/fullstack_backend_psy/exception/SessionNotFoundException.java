package com.cassinanasclinic.fullstack_backend_psy.exception;

public class SessionNotFoundException extends RuntimeException {
	public SessionNotFoundException(Long id) {
		super("Session of id " + id + " not found");
	}
}

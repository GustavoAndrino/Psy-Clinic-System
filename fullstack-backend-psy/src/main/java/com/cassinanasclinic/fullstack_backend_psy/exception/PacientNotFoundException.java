package com.cassinanasclinic.fullstack_backend_psy.exception;

public class PacientNotFoundException extends RuntimeException {
	public PacientNotFoundException(Long id) {
        super("Pacient with id " + id + " not found");
    }

}

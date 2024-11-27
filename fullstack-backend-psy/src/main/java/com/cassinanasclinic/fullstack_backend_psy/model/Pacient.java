package com.cassinanasclinic.fullstack_backend_psy.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;

@Entity
public class Pacient {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	private String dependentName;
	private String cpf;
	private String dependentCpf;
	private String adress;
	private String cep;
	private String phoneNumber;
	private String email;
	
	@OneToMany(mappedBy = "pacient", cascade = CascadeType.ALL)
	@OrderBy("date DESC")
	private List<Session> sessions;
	
	public Pacient() {
		
	}

	public Pacient(Long id, String name, String dependentName, String cpf, String dependentCpf, String adress,
			String cep, String phoneNumber, String email, List<Session> sessions) {
		super();
		this.id = id;
		this.name = name;
		this.dependentName = dependentName;
		this.cpf = cpf;
		this.dependentCpf = dependentCpf;
		this.adress = adress;
		this.cep = cep;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.sessions = sessions;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public List<Session> getSessions() {
		return sessions;
	}

	public void setSessions(List<Session> sessions) {
		this.sessions = sessions;
	}
	
	public void addSession(Session session) {
		this.sessions.add(session);
	}

	public Long getId() {
		return id;
	}
	
	public Long setId() {
		return id;
	}
	
	public Double getOwedValue() {	
		Double value = (double) 0;
		for (Session session : sessions) {
			if(!session.getPaid()) {
				value += session.getValue();
			}	
		}	
		return value;
	}
	//TODO adicionar metodo pra adicionar sessao no mesmo dia da proxima semana

}

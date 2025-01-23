package com.cassinanasclinic.fullstack_backend_psy.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	
	@Id
	@GeneratedValue
	private Long id;
	private String username;
	private String password;
	private int actions;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Pacient> pacients;
	
	public User() {
	    // default constructor
	}

	public User(Long id, String username, String password, int actions, List<Pacient> pacients) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.actions = actions;
		this.pacients = pacients;
	}
	
	public User(Long id, String username, String password, List<Pacient> pacients) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.actions = 20;
		this.pacients = pacients;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getActions() {
		return actions;
	}

	public void setActions(int actions) {
		this.actions = actions;
	}

	public List<Pacient> getPacients() {
		return pacients;
	}

	public void setPacients(List<Pacient> pacients) {
		this.pacients = pacients;
	}

	
}

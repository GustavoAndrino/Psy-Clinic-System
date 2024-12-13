package com.cassinanasclinic.fullstack_backend_psy.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Session {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime date;
	private double value;
	private Boolean paid;
	
	@ManyToOne
	@JoinColumn(name = "pacient_id")
	@JsonIgnore
	private Pacient pacient;
	
	public Session() {
		
	}

	public Session(Long id, LocalDateTime date, double value, Boolean paid) {
		super();
		this.id = id;
		this.date = date;
		this.value = value;
		this.paid = paid;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public double getValue() {
		return value;
	}

	public void setValue(double value) {
		this.value = value;
	}

	public Boolean getPaid() {
		return paid;
	}

	public void setPaid(Boolean paid) {
		this.paid = paid;
	}

	public Pacient getPacient() {
		return pacient;
	}

	public void setPacient(Pacient pacient) {
		this.pacient = pacient;
	}

	public Long getId() {
		return id;
	}	
	
	public Long setId() {
		return id;
	}

	public Long getThisPacientId() {
		return pacient.getId();
	}

}

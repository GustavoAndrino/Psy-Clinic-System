package com.cassinanasclinic.fullstack_backend_psy.model;

public class LoginRequest {
	private String Username;
	private String Password;
	
	public LoginRequest(String username, String password) {
		super();
		Username = username;
		Password = password;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

}

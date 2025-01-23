package com.cassinanasclinic.fullstack_backend_psy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cassinanasclinic.fullstack_backend_psy.model.Pacient;
import com.cassinanasclinic.fullstack_backend_psy.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

 //TODO Return pacients based on username
	
	User findByUsername(String username);

}

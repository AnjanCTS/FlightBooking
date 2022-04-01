package com.org.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.org.model.User;

public class UserDetailsImpl implements UserDetails {
	private static final long serialVersionUID = 1L;

	private Long id;

	private String username;

	private String email;

	private String userRole;

	private String phone;

	private String name;

	private boolean enabledd;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public UserDetailsImpl(Long id, String username, String email, String password,String userRole,String phone,boolean enabledd,String name) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.userRole = userRole;
		this.phone = phone;
		this.enabledd = enabledd;
		this.name = name;
	}
	public static UserDetailsImpl build(User user) {
		// List<GrantedAuthority> authorities = user.getRoles().stream()
		// 		.map(role -> new SimpleGrantedAuthority(role.getName().name()))
		// 		.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getId(), 
				user.getUserName(),
				user.getEmail(),
				user.getPassword(),user.getUserRole(),user.getPhone(),user.isEnabled(),user.getName());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		//return authorities;
		return Collections.singleton(new SimpleGrantedAuthority(this.userRole));
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	public String getUserRole() {
		return userRole;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public boolean isEnabledd() {
		return enabledd;
	}

	public void setEnabledd(boolean enabledd) {
		this.enabledd = enabledd;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
}

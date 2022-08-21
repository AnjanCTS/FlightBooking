package com.org.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.org.model.UserDto;
import com.org.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

//import com.org.dao.RoleDao;
import com.org.dao.UserDao;
import com.org.model.ERole;
//import com.org.model.Role;
import com.org.model.User;
import com.org.payload.request.LoginRequest;
import com.org.payload.request.SignupRequest;
import com.org.payload.response.JwtResponse;
import com.org.payload.response.MessageResponse;
import com.org.sercurity.jwt.JwtUtils;
import com.org.service.UserDetailsImpl;

//@CrossOrigin(origins = {"https://hoppscotch.io", "http://localhost:4200"})
@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserDao userRepository;

	@Autowired
	UserService userService;

	// @Autowired
	// RoleDao roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		System.out.println(loginRequest.getUsername()+" "+loginRequest.getPassword());
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		System.out.println("authentication : "+authentication.toString());
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		System.out.println("jwt : "+jwt);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
//		 String roles = userDetails.getAuthorities().stream()
//		 		.map(item -> item.getAuthority())
//		 		.collect(Collectors.toList());
        System.out.println("userDetails : "+userDetails.getPassword());
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
				                                 userDetails.getUserRole(),
				                                 userDetails.getPhone(),
				                                 userDetails.isEnabledd(),userDetails.getName()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUserName(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

	//	Set<String> strRoles = signUpRequest.getRole();
	//	System.out.println(strRoles);
	//	Set<Role> roles = new HashSet<>();

		// if (strRoles == null) {
		// 	System.out.println("INSIDE strRoles==NULL");
		// 	Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		// 			.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		// 	System.out.println(userRole.toString());
		// 	roles.add(userRole);
		// } else {
		// 	strRoles.forEach(role -> {
		// 		switch (role) {
		// 		case "admin":
		// 			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
		// 					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		// 			roles.add(adminRole);

		// 			break;
		// 		default:
		// 			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		// 					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		// 			roles.add(userRole);
		// 		}
		// 	});
		// }

		//user.setRoles(roles);
		//System.out.println("user.setRoles : "+user.getRoles());
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/validateToken")
	public ResponseEntity<UserDto> signIn(@RequestParam String token) throws Exception {
		System.out.println("Trying to validate token {}"+token);
		return ResponseEntity.ok(userService.validateToken(token));
	}
}

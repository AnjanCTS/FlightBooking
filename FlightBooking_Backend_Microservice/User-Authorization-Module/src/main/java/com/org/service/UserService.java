package com.org.service;

import com.org.dao.UserDao;
import com.org.model.User;
import com.org.model.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Value("${sprint2.app.jwtSecret}")
    private String jwtSecret;

    @Autowired
    UserDao userRepository;

    public UserDto validateToken(String token) throws Exception {
        String login = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        Optional<User> userOptional = userRepository.findByUserName(login);

        if (!(userOptional.isPresent())) {
            throw new Exception("User not found");
        }

        User user = userOptional.get();
        String userToken = createToken(user);

        return new UserDto(user.getId(),user.getUserName(),userToken);
    }

    private String createToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUserName());

        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }
}

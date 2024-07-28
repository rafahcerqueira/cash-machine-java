package cashmachine.api.service;

import lombok.AllArgsConstructor;
import cashmachine.api.config.AppConfig;
import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.dto.RegisterRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.jwt.JwtProvider;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.model.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/**
 * @author UrosVesic
 */
@Service
@AllArgsConstructor
public class AuthService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtProvider jwtProvider;
    private AppConfig appConfig;

    @Transactional
    public void signup(RegisterRequest registerRequest){
        User user = new User();
        user.setName(registerRequest.getName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        userRepository.save(user);
    }

    private String generateVerificationToken(User user) {
        String token = UUID.randomUUID().toString();
        return token;
    }

    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getName(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            String token = jwtProvider.generateToken(authenticate);
            return  new AuthResponse(token, loginRequest.getName(), "no");
    }

    @Transactional
    public User getCurrentUser(){
        String name=SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> currentUser = userRepository.findByName(name);
        return currentUser.orElseThrow(()->new MyRuntimeException("Current user not found"));
    }
}

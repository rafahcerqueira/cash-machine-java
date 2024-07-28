package cashmachine.api.controller;

import lombok.AllArgsConstructor;
import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.dto.RegisterRequest;
import cashmachine.api.service.AuthService;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody @Valid RegisterRequest registerRequest){
        authService.signup(registerRequest);
        return new ResponseEntity<>("Registration succesfull", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest loginRequest){
        return authService.login(loginRequest);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public  ResponseEntity<String> handleDataIntegrityViolationException(){
        return new ResponseEntity<>("Account with given name or email already exists",HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public  ResponseEntity<List<String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        List<ObjectError> allErrors = ex.getAllErrors();
        List<String> collect = allErrors.stream().map(err -> err.getDefaultMessage()).collect(Collectors.toList());
        return new ResponseEntity<>(collect,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> authExceptionHandler(AuthenticationException ex){
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.FORBIDDEN);
    }
}
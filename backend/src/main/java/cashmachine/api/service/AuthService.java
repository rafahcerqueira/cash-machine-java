package cashmachine.api.service;

import lombok.AllArgsConstructor;
import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.dto.RegisterRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.factory.CurrentAccountFactory;
import cashmachine.api.factory.SavingsAccountFactory;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.repository.AccountRepository;
import cashmachine.api.model.Account;
import cashmachine.api.model.User;
import cashmachine.api.proxy.AuthServiceProxy;
import cashmachine.api.factory.interfaces.IAccountFactory;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AccountRepository accountRepository;

    @Transactional
    public void register(RegisterRequest registerRequest) {
        User user = new User();
        user.setName(registerRequest.getName());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        IAccountFactory accountFactory;

        // Escolher a fábrica correta com base no tipo de conta do RegisterRequest
        if ("Poupança".equalsIgnoreCase(registerRequest.getType())) {
            accountFactory = new SavingsAccountFactory();
        } else if ("Corrente".equalsIgnoreCase(registerRequest.getType())) {
            accountFactory = new CurrentAccountFactory();
        } else {
            throw new IllegalArgumentException("Tipo de conta inválido: " + registerRequest.getType());
        }

        // Criar a conta usando a fábrica
        Account account = accountFactory.createAccount(user, registerRequest);
        user.setAccount(account);

        userRepository.save(user);
        accountRepository.save(account);
    }

    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
        AuthServiceProxy proxy = new AuthServiceProxy(this, passwordEncoder, userRepository);
        return proxy.login(loginRequest);
    }

    @Transactional
    public User getCurrentUser(Long id){
        Optional<User> currentUser = userRepository.findById(id);
        return currentUser.orElseThrow(()->new MyRuntimeException("Current user not found"));
    }
}
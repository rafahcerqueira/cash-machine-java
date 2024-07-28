package cashmachine.api.proxy;

import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.service.AuthService;
import cashmachine.api.validation.*;
import cashmachine.api.validation.interfaces.IValidationHandler;
import cashmachine.api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

// Proxy que valida o login do usuário usando cadeia de responsabilidades.
public class AuthServiceProxy {
    private final AuthService authService;
    private final IValidationHandler validationChain;

    public AuthServiceProxy(AuthService authService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authService = authService;

        // Criar a cadeia de validação.
        IValidationHandler usernameHandler = new NameValidationHandler();
        IValidationHandler accountNumberHandler = new AccountNumberValidationHandler();
        IValidationHandler passwordHandler = new PasswordValidationHandler(passwordEncoder, userRepository);

        // Configurar a cadeia de responsabilidade.
        usernameHandler.setNext(accountNumberHandler);
        accountNumberHandler.setNext(passwordHandler);

        this.validationChain = usernameHandler;  // Início da cadeia de validação.
    }

    public AuthResponse login(LoginRequest loginRequest) {
        try {
            validationChain.handle(loginRequest);  // Inicia a cadeia de validação.
            return authService.login(loginRequest);
        } catch (Exception e) {
            throw new MyRuntimeException("Falha na validação: " + e.getMessage());
        }
    }
}
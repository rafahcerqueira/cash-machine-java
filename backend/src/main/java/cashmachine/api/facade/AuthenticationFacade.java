package cashmachine.api.facade;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import cashmachine.api.service.AuthService;
import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.dto.RegisterRequest;

@Service
@AllArgsConstructor
public class AuthenticationFacade {
    private final AuthService authService;

    public AuthResponse login(LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    public void register(RegisterRequest registerRequest) {
        authService.register(registerRequest);
    }
}

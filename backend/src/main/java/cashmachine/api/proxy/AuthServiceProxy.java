package cashmachine.api.proxy;

import cashmachine.api.dto.AuthResponse;
import cashmachine.api.dto.LoginRequest;
import cashmachine.api.model.Account;
import cashmachine.api.model.User;
import cashmachine.api.repository.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@AllArgsConstructor
public class AuthServiceProxy {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest loginRequest, Account account) {
        User user = userRepository.findByName(loginRequest.getName()).orElse(null);
        
        if (user == null) {
            return new AuthResponse(null, "Invalid name");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return new AuthResponse(null, "Invalid password");
        }

        if (!user.getAccount().equals(account)) {
            return new AuthResponse(null, "Account does not belong to the user");
        }

        return new AuthResponse(user, "Authentication successful");
    }
}

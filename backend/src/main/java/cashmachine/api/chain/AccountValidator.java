package cashmachine.api.chain;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.repository.UserRepository;

// Handler para validar a conta do usuário
public class AccountValidator extends AbstractValidator {
    private UserRepository userRepository;

    public AccountValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void validate(LoginRequest loginRequest) {
        if (loginRequest.getAccountNumber() == null || loginRequest.getAccountNumber().isEmpty()) {
            throw new MyRuntimeException("Account is invalid");
        }

    }
}


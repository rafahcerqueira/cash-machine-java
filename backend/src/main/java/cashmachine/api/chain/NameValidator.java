package cashmachine.api.chain;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.repository.UserRepository;

// Handler para validar a conta do usuário
public class NameValidator extends AbstractValidator {
    private UserRepository userRepository;

    public NameValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void validate(LoginRequest loginRequest) {
        if (loginRequest.getName() == null || loginRequest.getName().isEmpty()) {
            throw new MyRuntimeException("Name is invalid");
        }

        checkNext(loginRequest);
    }
}
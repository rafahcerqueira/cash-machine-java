package cashmachine.api.chain;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;

// Handler para validar a senha do usuário
public class PasswordValidator extends AbstractValidator {
    @Override
    public void validate(LoginRequest loginRequest) {
        if (loginRequest.getPassword() == null || loginRequest.getPassword().length() < 6) {
            throw new MyRuntimeException("Password is invalid");
        }
        checkNext(loginRequest);
    }
}
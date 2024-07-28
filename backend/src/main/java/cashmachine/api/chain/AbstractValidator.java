package cashmachine.api.chain;

import cashmachine.api.chain.interfaces.Validator;
import cashmachine.api.dto.LoginRequest;

public abstract class AbstractValidator implements Validator {
    protected Validator next;

    protected void checkNext(LoginRequest loginRequest) {
        if (next != null) {
            next.validate(loginRequest);
        }
    }
}
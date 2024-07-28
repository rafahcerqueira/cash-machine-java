package cashmachine.api.chain.interfaces;

import cashmachine.api.dto.LoginRequest;

public interface Validator {
    void validate(LoginRequest loginRequest);
}
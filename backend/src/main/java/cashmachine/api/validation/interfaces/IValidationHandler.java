package cashmachine.api.validation.interfaces;

import cashmachine.api.dto.LoginRequest;

public interface IValidationHandler {
    void setNext(IValidationHandler nextHandler);
    void handle(LoginRequest loginRequest) throws Exception;
}
package cashmachine.api.validation;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.validation.interfaces.IValidationHandler;

// Handler para validar a conta do usuário
public class AccountNumberValidationHandler implements IValidationHandler {
    private IValidationHandler nextHandler;

    @Override
    public void setNext(IValidationHandler nextHandler) {
        this.nextHandler = nextHandler;
    }

    @Override
    public void handle(LoginRequest loginRequest) throws Exception {
        System.out.println("\n === AccountNumberValidationHandler.handle()");

        if (loginRequest.getAccountNumber() == null || loginRequest.getAccountNumber().isEmpty()) {
            throw new MyRuntimeException("Número da conta é obrigatório");
        }

        if (nextHandler != null) {
            nextHandler.handle(loginRequest);
        }
    }
}


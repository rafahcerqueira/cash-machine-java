package cashmachine.api.validation;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.validation.interfaces.IValidationHandler;

// Handler para validar o nome do usuário
public class NameValidationHandler implements IValidationHandler {
    private IValidationHandler nextHandler;

    @Override
    public void setNext(IValidationHandler nextHandler) {
        this.nextHandler = nextHandler;
    }

    @Override
    public void handle(LoginRequest loginRequest) throws Exception {
        System.out.println("\n === NameValidationHandler.handle()");

        if (loginRequest.getName() == null || loginRequest.getName().isEmpty()) {
            throw new MyRuntimeException("Nome do usuário é obrigatório");
        }

        if (nextHandler != null) {
            nextHandler.handle(loginRequest);
        }
    }
}

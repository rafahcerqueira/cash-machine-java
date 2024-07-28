package cashmachine.api.factory.interfaces;

import cashmachine.api.dto.RegisterRequest;
import cashmachine.api.model.Account;
import cashmachine.api.model.User;

// Interface para a Abstract Factory de criação de contas
public interface IAccountFactory {
    Account createAccount(User user, RegisterRequest registerRequest);
}


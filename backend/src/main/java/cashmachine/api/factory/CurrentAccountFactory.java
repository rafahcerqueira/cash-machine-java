package cashmachine.api.factory;

import cashmachine.api.model.Account;
import cashmachine.api.model.User;
import cashmachine.api.dto.RegisterRequest;
import cashmachine.api.utils.AccountNumberGenerator;
import cashmachine.api.factory.interfaces.IAccountFactory;

import java.math.BigDecimal;

// Factory para criação de contas do tipo Corrente
public class CurrentAccountFactory implements IAccountFactory {

    @Override
    public Account createAccount(User user, RegisterRequest registerRequest) {
        Account account = new Account();
        account.setAccountNumber(AccountNumberGenerator.generateAccountNumber());
        account.setType("CORRENTE");
        account.setLevel(registerRequest.getLevel());
        account.setBalance(BigDecimal.ZERO);
        account.setUser(user);

        return account;
    }
}

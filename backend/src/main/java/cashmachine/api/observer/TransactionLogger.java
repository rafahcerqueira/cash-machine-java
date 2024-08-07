package cashmachine.api.observer;

import org.springframework.stereotype.Component;

@Component
public class TransactionLogger implements IObserver {

    @Override
    public void update(Object event) {
        if (event instanceof DepositEvent) {
            System.out.println("Deposit Event: " + event);
        } else if (event instanceof WithdrawEvent) {
            System.out.println("Withdraw Event: " + event);
        } else if (event instanceof TransferEvent) {
            System.out.println("Transfer Event: " + event);
        }
    }
}
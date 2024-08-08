package cashmachine.api.observer;

import java.math.BigDecimal;

public class TransferEvent {
    private String accountNumberOrigin;
    private String accountNumberRecipient;
    private BigDecimal amount;

    public TransferEvent(String accountNumberOrigin, String accountNumberRecipient, BigDecimal amount) {
        this.accountNumberOrigin = accountNumberOrigin;
        this.accountNumberRecipient = accountNumberRecipient;
        this.amount = amount;
    }

    public String getaccountNumberOrigin() {
        return accountNumberOrigin;
    }

    public void setaccountNumberOrigin(String accountNumberOrigin) {
        this.accountNumberOrigin = accountNumberOrigin;
    }

    public String getaccountNumberRecipient() {
        return accountNumberRecipient;
    }

    public void setaccountNumberRecipient(String accountNumberRecipient) {
        this.accountNumberRecipient = accountNumberRecipient;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "TransferEvent{" +
                "accountNumberOrigin=" + accountNumberOrigin +
                ", accountNumberRecipient=" + accountNumberRecipient +
                ", amount=" + amount +
                '}';
    }
}

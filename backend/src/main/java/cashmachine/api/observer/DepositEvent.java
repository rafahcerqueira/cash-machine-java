package cashmachine.api.observer;

import java.math.BigDecimal;
import java.util.Map;

public class DepositEvent {
    private Long userId;
    private BigDecimal amount;
    private Map<Integer, Integer> requestedNotes;

    public DepositEvent(Long userId, BigDecimal amount, Map<Integer, Integer> requestedNotes) {
        this.userId = userId;
        this.amount = amount;
        this.requestedNotes = requestedNotes;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Map<Integer, Integer> getRequestedNotes() {
        return requestedNotes;
    }

    public void setRequestedNotes(Map<Integer, Integer> requestedNotes) {
        this.requestedNotes = requestedNotes;
    }

    @Override
    public String toString() {
        return "DepositEvent{" +
                "userId=" + userId +
                ", amount=" + amount +
                ", requestedNotes=" + requestedNotes +
                '}';
    }
}

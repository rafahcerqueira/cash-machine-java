package cashmachine.api.observer;

import java.math.BigDecimal;

public class TransferEvent {
    private Long sourceUserId;
    private Long targetUserId;
    private BigDecimal amount;

    public TransferEvent(Long sourceUserId, Long targetUserId, BigDecimal amount) {
        this.sourceUserId = sourceUserId;
        this.targetUserId = targetUserId;
        this.amount = amount;
    }

    public Long getSourceUserId() {
        return sourceUserId;
    }

    public void setSourceUserId(Long sourceUserId) {
        this.sourceUserId = sourceUserId;
    }

    public Long getTargetUserId() {
        return targetUserId;
    }

    public void setTargetUserId(Long targetUserId) {
        this.targetUserId = targetUserId;
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
                "sourceUserId=" + sourceUserId +
                ", targetUserId=" + targetUserId +
                ", amount=" + amount +
                '}';
    }
}

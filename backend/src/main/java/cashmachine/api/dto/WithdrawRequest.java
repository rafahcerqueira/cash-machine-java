package cashmachine.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WithdrawRequest {
    private Long userId;
    private BigDecimal amount;
    private Map<Integer, Integer> notes;
}
package cashmachine.api.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author UrosVesic
 */
@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
}

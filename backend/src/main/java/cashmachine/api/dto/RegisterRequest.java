package cashmachine.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * @author UrosVesic
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @Email(message = "Bad email format")
    @NotEmpty(message = "Email is required")
    @NotNull(message = "Email is required")
    private String email;
    @NotNull(message = "Name is required")
    @NotEmpty(message = "Name is required")
    private String name;
    @NotNull(message = "Password is required")
    @NotEmpty(message = "Password is required")
    private String password;
}

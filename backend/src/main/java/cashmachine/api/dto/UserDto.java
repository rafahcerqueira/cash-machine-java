package cashmachine.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import cashmachine.api.model.Account;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Dto{

    private Long id;
    private String name;
    private Account account;
}

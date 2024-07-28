package cashmachine.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import cashmachine.api.enums.AccountType;
import cashmachine.api.enums.AccountLevel;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Dto{

    private Long id;
    private String name;
    private AccountType accountType;
    private AccountLevel accountLevel;
}

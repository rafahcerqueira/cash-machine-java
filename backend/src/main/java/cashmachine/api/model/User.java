package cashmachine.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import cashmachine.api.enums.AccountLevel;
import cashmachine.api.enums.AccountType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "users")
public class User implements MyEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(unique = true)
    private String name;

    @NotBlank(message = "Password is required")
    @NotNull(message = "Password is required")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_type", nullable = false)
    private AccountType accountType;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_level", nullable = false)
    private AccountLevel accountLevel; 
}

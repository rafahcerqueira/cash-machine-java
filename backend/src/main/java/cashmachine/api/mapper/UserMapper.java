package cashmachine.api.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import cashmachine.api.dto.UserDto;
import cashmachine.api.model.User;

@Component
@AllArgsConstructor
public class UserMapper implements GenericMapper<UserDto, User> {

    @Override
    public User toEntity(UserDto dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setAccount(dto.getAccount());
        return user;
    }
    
    @Override
    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setAccount(user.getAccount());
        return dto;
    }
}

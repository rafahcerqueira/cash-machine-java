package cashmachine.api.service;

import lombok.AllArgsConstructor;
import cashmachine.api.dto.UserDto;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.mapper.UserMapper;
import cashmachine.api.model.*;
import cashmachine.api.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    @Transactional
    public UserDto getUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        User user = userOpt.orElseThrow(()->new MyRuntimeException("User with id : "+ id +" not found"));
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDto getProfileInfo(String name) {
        User user = userRepository.findByName(name).orElseThrow(()->new MyRuntimeException("User not found"));
        return userMapper.toDto(user);
    }

    @Transactional
    public void updateUser(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(() -> new MyRuntimeException("User not found"));
        if(userRepository.findByName(userDto.getName()).isPresent() && !user.getName().equals(userDto.getName())){
            throw new MyRuntimeException("Name taken");
        }
        user.setName(userDto.getName());
        userRepository.save(user);
    }
}
package cashmachine.api.service;

import lombok.AllArgsConstructor;
import cashmachine.api.dto.UserDto;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.mapper.UserMapper;
import cashmachine.api.model.*;
import cashmachine.api.repository.UserRepository;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;
    private AuthService authService;


    @Transactional
    public void follow(String name){
        User currentUser = authService.getCurrentUser();
        Optional<User> userOptFollowed = userRepository.findByName(name);

        User userFollowed = userOptFollowed.orElseThrow(() -> new MyRuntimeException("User not found"));

        if(userFollowed.getName().equals(currentUser.getName())){
            throw new MyRuntimeException("Following not allowed");
        }

    }

    @Transactional
    public void unfollow(User currentUser, String name){
        Optional<User> userOptFollowed = userRepository.findByName(name);

        User userFollowed = userOptFollowed.orElseThrow(() -> new MyRuntimeException("User not found"));

        if(userFollowed.getName().equals(currentUser.getName())){
            throw new MyRuntimeException("Following not allowed");
        }
    }

    @Transactional
    public UserDto getUser(Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        User user = userOpt.orElseThrow(()->new MyRuntimeException("User with id : "+id+" not found"));
        return userMapper.toDto(user);
    }
    @Transactional
    public void unfollow(Long idFollowing, Long idFollowed) {
        Optional<User> userOptFollowing = userRepository.findById(idFollowing);
        Optional<User> userOptFollowed = userRepository.findById(idFollowed);

        User userFollowing = userOptFollowing.orElseThrow(() -> new MyRuntimeException("User not found"));
        User userFollowed = userOptFollowed.orElseThrow(() -> new MyRuntimeException("User not found"));

        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        if(!userFollowing.getName().equals(name)|| userFollowed.getName().equals(name)){
            throw new MyRuntimeException("Unfollowing not allowed");
        }
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

    public void disableUser(String name) {
        User user = userRepository.findByName(name).orElseThrow(()->new MyRuntimeException("User not found"));
        userRepository.save(user);
    }

    public void enableUser(String name) {
        User user = userRepository.findByName(name).orElseThrow(()->new MyRuntimeException("User not found"));
        userRepository.save(user);
    }

}

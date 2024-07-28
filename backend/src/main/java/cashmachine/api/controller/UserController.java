package cashmachine.api.controller;

import lombok.AllArgsConstructor;
import cashmachine.api.dto.UserDto;
import cashmachine.api.exception.ErrorResponse;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id){
        UserDto userDto = userService.getUser(id);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/profile-info/{name}")
    public ResponseEntity<UserDto> getProfileInfo(@PathVariable String name){
        UserDto userResponse=userService.getProfileInfo(name);
        return new ResponseEntity<UserDto>(userResponse, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDto userDto){
        userService.updateUser(userDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(MyRuntimeException.class)
    public  ResponseEntity<ErrorResponse> handleMyRuntimeException(MyRuntimeException ex){
        ErrorResponse error = new ErrorResponse(ex.getMessage());
        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }
}

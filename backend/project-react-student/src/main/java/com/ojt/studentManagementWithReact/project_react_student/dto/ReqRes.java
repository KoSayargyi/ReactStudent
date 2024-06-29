package com.ojt.studentManagementWithReact.project_react_student.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String photo;
    private String gender;
    private String education;
    private User.Role role;
    private MultipartFile file;
    private User user;
    private List<User> userList;
}

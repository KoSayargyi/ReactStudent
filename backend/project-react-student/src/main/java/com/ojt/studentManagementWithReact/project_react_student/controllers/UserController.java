package com.ojt.studentManagementWithReact.project_react_student.controllers;

import com.ojt.studentManagementWithReact.project_react_student.dto.ReqRes;
import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import com.ojt.studentManagementWithReact.project_react_student.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@ModelAttribute ReqRes reg) {
        return ResponseEntity.ok(userService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req) {
        return ResponseEntity.ok(userService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers() {
        return ResponseEntity.ok(userService.getAllActiveUsers());

    }

    @GetMapping("/admin/get-all-students")
    public ResponseEntity<ReqRes> getAllStudents() {
        return ResponseEntity.ok(userService.getAllActiveStudents());

    }

    @GetMapping("/adminUser/get-student")
    public ResponseEntity<ReqRes> getStudent() {
        return ResponseEntity.ok(userService.getStudent());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUserByID(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Long userId, @RequestBody ReqRes reqres) {
        return ResponseEntity.ok(userService.updateUser(userId, reqres));
    }

//    @GetMapping("/adminuser/get-profile")
//    public ResponseEntity<ReqRes> getMyProfile(){
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String email = authentication.getName();
//        ReqRes response = userService.getMyInfo(email);
//        return  ResponseEntity.status(response.getStatusCode()).body(response);
//    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.deleteUser(userId));
    }
}

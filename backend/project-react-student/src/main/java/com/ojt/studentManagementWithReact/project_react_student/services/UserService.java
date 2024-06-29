package com.ojt.studentManagementWithReact.project_react_student.services;

import com.cloudinary.Cloudinary;
import com.ojt.studentManagementWithReact.project_react_student.dto.ReqRes;
import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import com.ojt.studentManagementWithReact.project_react_student.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepo userRepo;
    private final JWTUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final List<String> photoExtensions = Arrays.asList(".jpg", ".jpeg", ".png", ".gif", "bmp", "tiff", "tif", "psv", "svg", "webp", "ico", "heic");
    private final Cloudinary cloudinary;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setRole(User.Role.USER);
            user.setName(registrationRequest.getName());
            user.setDate(new Date());
            user.setPhone(registrationRequest.getPhone());
            user.setGender(registrationRequest.getGender());
            if (!registrationRequest.getFile().isEmpty()) {
                MultipartFile file = registrationRequest.getFile();
                if (isValidPhotoExtension(getFileExtension(file))) {
                    user.setPhoto(uploadPhoto(file));
                }
            }
            user.setEducation(registrationRequest.getEducation());
            user.setActive(true);
            user.setDeleted(false);
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            var svgUser = userRepo.save(user);
            if (svgUser.getId() > 0) {
                resp.setUser((svgUser));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setName(user.getName());
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();
        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            User users = userRepo.findByEmail(email).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public ReqRes getAllActiveUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<User> result = userRepo.findAll();
            if (!result.isEmpty()) {
                List<User> users = new ArrayList<>();
                for (User user : result) {
                    if (user.isActive() && !user.getRole().equals(User.Role.ADMIN)) {
                        users.add(user);
                    }
                }
                reqRes.setUserList(users);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }

    @Transactional
    public ReqRes deleteUser(Long userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                userOptional.ifPresent(u -> {
                    u.setActive(false);
                    userRepo.save(u);

                });
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    @Transactional
    public ReqRes updateUser(Long userId, ReqRes updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setRole(updatedUser.getRole());
                existingUser.setPhone(updatedUser.getPhone());
                existingUser.setEducation(updatedUser.getEducation());
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepo.save(existingUser);
                reqRes.setUser(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getUsersById(Long id) {
        ReqRes reqRes = new ReqRes();
        try {
            User usersById = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setUser(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getAllActiveStudents() {
        ReqRes reqRes = new ReqRes();

        try {
            List<User> result = userRepo.findAll();
            if (!result.isEmpty()) {
                List<User> users = new ArrayList<>();
                for (User user : result) {
                    if (user.isActive() && user.getRole().equals(User.Role.STUDENT)) {
                        users.add(user);
                    }
                }
                reqRes.setUserList(users);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }


    public ReqRes getStudent() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepo.findByEmail(email).orElse(null);
        ReqRes reqRes = new ReqRes();
        if (user != null) {
            List<User> users = new ArrayList<>();
            users.add(user);
            reqRes.setUserList(users);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Successful");
        } else {
            reqRes.setStatusCode(404);
            reqRes.setMessage("No users found");
        }
        return reqRes;
    }

    private boolean isValidPhotoExtension(String extension) {
        return photoExtensions.contains(extension);
    }

    private String getFileExtension(MultipartFile file) {
        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.')).toLowerCase();
    }

    private String uploadPhoto(MultipartFile file) throws IOException {
        return cloudinary.uploader()
                .upload(file.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                .get("url").toString();
    }

}

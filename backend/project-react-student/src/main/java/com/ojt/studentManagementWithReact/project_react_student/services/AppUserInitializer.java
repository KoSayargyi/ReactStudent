package com.ojt.studentManagementWithReact.project_react_student.services;

import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import com.ojt.studentManagementWithReact.project_react_student.repositories.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class AppUserInitializer {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    @EventListener(classes = ContextRefreshedEvent.class)
    public void initializeSystemAdmin() {
        if (userRepo.count() == 0) {
            var user = new User();
            user.setName("admin");
            user.setEmail("admin@gmail.com");
            user.setGender("MALE");
            user.setDate(new Date());
            user.setPassword(passwordEncoder.encode("admin"));
            user.setActive(true);
            user.setDeleted(false);
            user.setPhone("09988763121");
            user.setRole(User.Role.ADMIN);
            userRepo.save(user);
        }
    }
}

package com.ojt.studentManagementWithReact.project_react_student.repositories;

import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);
}

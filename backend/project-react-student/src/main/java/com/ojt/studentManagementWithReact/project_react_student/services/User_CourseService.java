package com.ojt.studentManagementWithReact.project_react_student.services;

import com.ojt.studentManagementWithReact.project_react_student.dto.User_CourseDto;
import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import com.ojt.studentManagementWithReact.project_react_student.entities.User_Course;
import com.ojt.studentManagementWithReact.project_react_student.repositories.CourseRepo;
import com.ojt.studentManagementWithReact.project_react_student.repositories.UserRepo;
import com.ojt.studentManagementWithReact.project_react_student.repositories.User_CourseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class User_CourseService {
    private final User_CourseRepo user_courseRepo;
    private final UserRepo userRepo;
    private final CourseRepo courseRepo;

    @Transactional
    public void insertedUserCourse(User_CourseDto user_courseDto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("EMAIL ISEXISTED" + email);
        userRepo.findByEmail(email.trim()).ifPresent(user -> {
            user.setRole(User.Role.STUDENT);
            userRepo.save(user);

            if (!user_courseDto.getCourseId().isEmpty()) {
                for (Long courseId : user_courseDto.getCourseId()) {
                    courseRepo.findById(courseId).ifPresent(course -> {
                        User_Course user_course = User_Course.builder()
                                .course(course)
                                .user(user)
                                .date(new Date())
                                .build();
                        user_courseRepo.save(user_course);
                    });
                }
            }
        });
    }

    @Transactional
    public void deletedCourse(Long courseId, Long studentId) {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepo.findByEmail(email.trim()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Long userIdToUse = user.getRole().equals(User.Role.ADMIN) ? studentId : user.getId();
        deleteCourseForUser(userIdToUse, courseId);
    }

    private void deleteCourseForUser(Long userId, Long courseId) {
        List<User_Course> userCourses = user_courseRepo.findByUserId(userId);

        if (userCourses.isEmpty()) {
            return;
        }

        User_Course userCourse = userCourses.stream()
                .filter(u -> u.getCourse().getId().equals(courseId))
                .findFirst()
                .orElse(null);
        System.out.println("SHI LRR"+userCourse.getCourse().getName());

        if (userCourse == null) {
            System.out.println("Course not found for user: " + userId + ", courseId: " + courseId);
            return;
        }

        System.out.println("Deleting course: " + userCourse.getCourse().getName() + " for user: " + userId);
        if (userCourses.size() == 1) {
            userRepo.findById(userId).ifPresent(u -> {
                u.setRole(User.Role.USER);
                userRepo.save(u);
            });
        }

        try {
            user_courseRepo.deleteById(userCourse.getId());
            user_courseRepo.flush(); // Ensure changes are flushed to the database
            System.out.println("Deleted course with id: " + userCourse.getId());
        } catch (Exception e) {
            System.err.println("Error during deletion: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

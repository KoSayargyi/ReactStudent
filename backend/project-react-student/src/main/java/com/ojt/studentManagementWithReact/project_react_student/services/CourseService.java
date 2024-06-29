package com.ojt.studentManagementWithReact.project_react_student.services;

import com.ojt.studentManagementWithReact.project_react_student.dto.CourseDto;
import com.ojt.studentManagementWithReact.project_react_student.entities.Course;
import com.ojt.studentManagementWithReact.project_react_student.entities.User;
import com.ojt.studentManagementWithReact.project_react_student.entities.User_Course;
import com.ojt.studentManagementWithReact.project_react_student.repositories.CourseRepo;
import com.ojt.studentManagementWithReact.project_react_student.repositories.UserRepo;
import com.ojt.studentManagementWithReact.project_react_student.repositories.User_CourseRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepo courseRepo;
    private final UserRepo userRepo;
    private final User_CourseRepo user_courseRepo;


    @Transactional
    public Course insertedCourse(CourseDto courseDto) {
        var course = new Course();
        course.setName(courseDto.getName());
        course.setDate(new Date());
        courseRepo.save(course);
        return course;
    }

    @Transactional
    public void editedCourse(Long id, CourseDto courseDto) {
        courseRepo.findById(id).ifPresent(c -> {
            c.setName(courseDto.getName());
            courseRepo.save(c);
        });
    }

    @Transactional
    public void deletedCourse(Long id) {
        courseRepo.findById(id).ifPresent(c -> {
            c.setDeleted(true);
            courseRepo.save(c);
        });
    }

    public List<Course> getAllActiveCourses() {
        List<Course> courseList = new ArrayList<>();
        List<Course> courses = courseRepo.findAll();
        for (Course course : courses) {
            if (!course.isDeleted()) {
                courseList.add(course);
            }
        }
        return courseList;
    }

    public List<Course> getAllCoursesByUserId() {
        var email = SecurityContextHolder.getContext().getAuthentication().getName();

        var user = userRepo.findByEmail(email.trim()).orElseThrow(() -> new RuntimeException("User not found"));

        return user_courseRepo.findByUserId(user.getId()).stream()
                .map(userCourse -> courseRepo.findById(userCourse.getCourse().getId())
                        .orElseThrow(() -> new RuntimeException("Course not found")))
                .filter(course -> !course.isDeleted())
                .collect(Collectors.toList());
    }

    public Map<Long, List<Course>> getAllCoursesForEachUser() {
        Map<Long, List<Course>> response = new HashMap<>();
        List<User> users = getAllActiveUsers();

        for (User user : users) {
            List<Course> courses = user_courseRepo.findByUserId(user.getId())
                    .stream()
                    .map(User_Course::getCourse)
                    .filter(c -> !c.isDeleted())
                    .collect(Collectors.toList());
            response.put(user.getId(), courses);
        }

        return response;
    }

    private List<User> getAllActiveUsers() {
        return userRepo.findAll().stream()
                .filter(User::isActive)
                .filter(user -> user.getRole().equals(User.Role.STUDENT))
                .collect(Collectors.toList());
    }

    public Map<Long, List<Course>> getAllCourseUser() {
        Map<Long, List<Course>> response = new HashMap<>();
        var user = userRepo.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
        List<Course> courses = user_courseRepo.findByUserId(user.getId())
                .stream()
                .map(User_Course::getCourse)
                .filter(c -> !c.isDeleted())
                .collect(Collectors.toList());
        response.put(user.getId(), courses);
        return response;
    }
}

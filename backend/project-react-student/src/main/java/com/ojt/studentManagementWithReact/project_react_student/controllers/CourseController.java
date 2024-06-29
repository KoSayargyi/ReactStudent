package com.ojt.studentManagementWithReact.project_react_student.controllers;

import com.ojt.studentManagementWithReact.project_react_student.dto.CourseDto;
import com.ojt.studentManagementWithReact.project_react_student.entities.Course;
import com.ojt.studentManagementWithReact.project_react_student.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/admin/create")
    public ResponseEntity<Map<String, String>> insertedCourse(@RequestBody CourseDto courseDto) {
        var course = courseService.insertedCourse(courseDto);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Course Created Successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PutMapping("/admin/edited/{id}")
    public ResponseEntity<Map<String, String>> editedCourse(@PathVariable("id")Long id,@RequestBody CourseDto courseDto) {
        courseService.editedCourse(id,courseDto);
        Map<String, String> res = new HashMap<>();
        res.put("message", "User updated Successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/admin/deleted/{id}")
    public ResponseEntity<Map<String, String>> deletedCourse(@PathVariable("id") Long id) {
        courseService.deletedCourse(id);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Course deleted Successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @GetMapping("/adminUser/getAll")
    public ResponseEntity<List<Course>> getAllActiveCourses() {
        var courses = courseService.getAllActiveCourses();
        return ResponseEntity.status(HttpStatus.OK).body(courses);
    }

    @GetMapping("/adminUser/getUserCourses")
    public ResponseEntity<List<Course>> getAllCoursesByUserId(){
        return  ResponseEntity.status(HttpStatus.OK).body(courseService.getAllCoursesByUserId());
    }

    @GetMapping("/adminUser/getUser-Courses")
    public ResponseEntity<Map<Long,List<Course>>> getAllCoursesForEachUser(){
        return  ResponseEntity.status(HttpStatus.OK).body(courseService.getAllCoursesForEachUser());
    }

    @GetMapping("/adminUser/get-Course")
    public ResponseEntity<Map<Long,List<Course>>> getCourseForUser(){
        return  ResponseEntity.status(HttpStatus.OK).body(courseService.getAllCourseUser());
    }
}

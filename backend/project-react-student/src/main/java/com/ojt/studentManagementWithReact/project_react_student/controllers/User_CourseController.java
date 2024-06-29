package com.ojt.studentManagementWithReact.project_react_student.controllers;

import com.ojt.studentManagementWithReact.project_react_student.dto.User_CourseDto;
import com.ojt.studentManagementWithReact.project_react_student.entities.Course;
import com.ojt.studentManagementWithReact.project_react_student.services.CourseService;
import com.ojt.studentManagementWithReact.project_react_student.services.User_CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("adminUser")
public class User_CourseController {

    private final User_CourseService user_courseService;

    @PutMapping("/create")
    public ResponseEntity<Map<String, String>> insertedUserCourse(@RequestBody User_CourseDto user_courseDto) {
        System.out.println("DFDSF"+user_courseDto.getCourseId().size());
        user_courseService.insertedUserCourse(user_courseDto);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Course added Successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @DeleteMapping("/delete/{id}/{studentId}")
    public ResponseEntity<Map<String, String>> deletedUserCourse(@PathVariable("id")Long id,@PathVariable("studentId")Long studentId) {
        System.out.println("USERID"+id + "DFDF"+studentId);
        user_courseService.deletedCourse(id,studentId);
        Map<String, String> res = new HashMap<>();
        res.put("message", "Course deleted Successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

}

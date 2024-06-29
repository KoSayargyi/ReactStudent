package com.ojt.studentManagementWithReact.project_react_student.repositories;

import com.ojt.studentManagementWithReact.project_react_student.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course,Long> {


}

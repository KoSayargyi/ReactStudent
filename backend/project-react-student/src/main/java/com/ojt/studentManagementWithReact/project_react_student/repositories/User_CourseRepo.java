package com.ojt.studentManagementWithReact.project_react_student.repositories;

import com.ojt.studentManagementWithReact.project_react_student.entities.Course;
import com.ojt.studentManagementWithReact.project_react_student.entities.User_Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface User_CourseRepo extends JpaRepository<User_Course,Long> {

    List<User_Course> findByUserId(Long id);

    Course findByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query("DELETE FROM User_Course uc WHERE uc.id = :id")
    void deleteById(@Param("id") Long id);
}

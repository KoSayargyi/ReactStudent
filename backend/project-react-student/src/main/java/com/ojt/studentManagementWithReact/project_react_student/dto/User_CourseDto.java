package com.ojt.studentManagementWithReact.project_react_student.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User_CourseDto {

    private List<Long> courseId;
}

package com.ojt.studentManagementWithReact.project_react_student.entities;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "user_student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User_Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course")
    private Course course;
}

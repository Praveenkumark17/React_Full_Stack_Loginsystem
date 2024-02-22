package com.form.log_form.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Course {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long course_id;
    private Integer course_name;
    private Integer Staff_admin;
    private Integer student;
}

package com.form.log_form.Repository;

import com.form.log_form.Model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository< Course,Long> {

    @Query(value = "SELECT course.* FROM course WHERE course.courseno NOT IN ( SELECT courseno FROM staffcourse WHERE staffcourse.staffid = :id );",nativeQuery = true)
    public List<Course> findCoursesNotInStaffcourseByStaffid(@Param("id") Long id);

    @Query(value = "SELECT course.* FROM course WHERE course.courseno IN ( SELECT courseno FROM staffcourse WHERE staffcourse.staffid = :id );",nativeQuery = true)
    public List<Course> findCoursesInStaffcourseByStaffid(@Param("id") Long id);
}

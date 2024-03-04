package com.form.log_form.Repository;

import com.form.log_form.Model.Staffcourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffcourseRepository extends JpaRepository<Staffcourse,Long> {
    public List<Staffcourse> findByStaffid(Integer staffid);
}

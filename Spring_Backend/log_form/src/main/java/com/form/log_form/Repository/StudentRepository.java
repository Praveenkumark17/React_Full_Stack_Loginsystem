package com.form.log_form.Repository;

import com.form.log_form.Model.Studentscourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Studentscourse,Long> {

    @Query(value = "select * from studentcourse where studentid= :stuid",nativeQuery = true)
    public List<Studentscourse> findStudentscourseByStudentid(@Param("stuid") Integer studentid);
}

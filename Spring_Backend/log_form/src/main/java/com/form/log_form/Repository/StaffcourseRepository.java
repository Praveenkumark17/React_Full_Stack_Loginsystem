package com.form.log_form.Repository;

import com.form.log_form.Model.Staffcourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface StaffcourseRepository extends JpaRepository<Staffcourse,Long> {
    public List<Staffcourse> findByStaffid(Integer staffid);

    public List<Staffcourse> findByDeptno(Integer deptno);


    @Query(value = "select staffcourse.* from staffcourse where staffid= :staffid and courseno= :courseno", nativeQuery = true)
    public Optional<Staffcourse> findByCourseno(@Param("courseno") Integer courseno, @Param("staffid") Integer staffid);

    @Query(value = "select staffcourse.* from staffcourse where deptno = :depno and courseno not  in (select courseno from studentcourse where studentid = :stuid)",nativeQuery = true)
    public List<Staffcourse> findByStudentid(@Param("stuid") Integer studentid,@Param("depno") Integer deptno);
}

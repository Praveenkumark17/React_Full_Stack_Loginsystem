package com.form.log_form.Repository;

import com.form.log_form.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUserid(String data);
    public User findByEmail(String email);

    public List<User> findByDeptno(Integer deptno);

    @Query(value = " select * from user where id in (select studentid from studentcourse where courseno = :cno and staffid= :sno)",nativeQuery = true)
    public List<User> findUserByStaffidAndCourseno(@Param("cno") Integer courseno,@Param("sno") Integer staffid);
}

package com.form.log_form.Repository;

import com.form.log_form.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUserid(String data);
    public User findByEmail(String email);

    public List<User> findByDeptno(Integer deptno);
}

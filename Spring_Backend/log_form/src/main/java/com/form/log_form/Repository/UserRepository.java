package com.form.log_form.Repository;

import com.form.log_form.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByUserid(String data);
    public User findByEmail(String email);
}

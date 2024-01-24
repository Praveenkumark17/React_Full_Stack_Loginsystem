package com.form.log_form.Service;

import com.form.log_form.Model.PasswordData;
import com.form.log_form.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface Userservice {
    public List<User> getUser();

    public  User saveUser(User newuser);

    public User passdata(PasswordData data);

    public User updatedata(Long id, User user);

    public User updatepass(Long id, User user);

    public User getId(Long id);

    public String deleteUser(Long id);
}

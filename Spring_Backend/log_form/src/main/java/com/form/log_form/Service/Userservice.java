package com.form.log_form.Service;

import com.form.log_form.Model.Authorities;
import com.form.log_form.Model.Department;
import com.form.log_form.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public interface Userservice {
    public List<User> getUser();

    public  User saveUser(User newuser,MultipartFile file);

    public ResponseEntity<?> passdata(User data);

    public User updatedata(Long id, User user);

    public User updatepass(Long id, User user);

    public User getId(Long id);

    public String deleteUser(Long id);

    public ResponseEntity<?> findEmail(String email);

    public ResponseEntity<?> finddeptno(Integer deptno);

    // -----------> Authorities <----------- \\

    public Authorities putAuth (Long id,Authorities auth);

    public Authorities putAuthstudent(Long id,Authorities auth);

    // --------->   Departments <--------- \\

    public ResponseEntity<?> postdept(Department dept);

    public List<?> getdept();

    public Department getdeptid(Long id);

    public Department getdeptno(Integer deptno);

    public Department putdept(Integer deptno, Department dept);

    public String deletedpt(Long id);
}

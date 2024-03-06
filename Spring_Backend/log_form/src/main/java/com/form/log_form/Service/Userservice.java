package com.form.log_form.Service;

import com.form.log_form.Model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public interface Userservice {

    // --------->   User   <--------- \\

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

    // --------->   Course   <--------- \\

    public ResponseEntity<?> postcourse(Course course);

    public List<?> getcourse();

    public Course getcourseid(Long id);

    public List<Course> findcoursebykey(Long id);

    public List<Course> findcoursebykeyin(Long id);

    public String deletecourse(Long id);

    // --------->  Staff Course   <--------- \\

    public ResponseEntity<?> poststaffcourse(Staffcourse course);

    public List<Staffcourse> getstaffcourseby();

    public List<Staffcourse> getstaffcoursebyid(Integer staffid);

    public List<Staffcourse> getstaffcoursebydeptno(Integer deptno);

    public Staffcourse getstaffcoursebycourseno(Integer courseno, Integer staffid);

    public Staffcourse putstaffcoursebycourseno( Integer courseno, Integer staffid, Staffcourse staff );
}

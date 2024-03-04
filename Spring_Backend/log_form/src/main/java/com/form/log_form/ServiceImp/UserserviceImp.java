package com.form.log_form.ServiceImp;

import com.form.log_form.Exception.Usernotfoundexception;
import com.form.log_form.Model.*;
import com.form.log_form.Repository.*;
import com.form.log_form.Service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Service
public class UserserviceImp implements Userservice {

    @Autowired
    public UserRepository reposity;

    @Autowired
    public AutoritiesReapository authreposity;

    @Autowired
    public DepartmentRepository deptreposity;

    @Autowired
    public CourseRepository courseRepository;

    @Autowired
    public StaffcourseRepository staffcourseRepository;

    // --------->   User   <--------- \\

    @Override
    public List<User> getUser(){
        return reposity.findAll();
    }
    @Override
    public User saveUser(User newuser,MultipartFile file){

        try {
            // Save the file locally
            byte[] bytes = file.getBytes();
            String File = file.getOriginalFilename();
            Path path = Paths.get("../React_Frontend/src/Images/" + File);
            Files.createDirectories(path.getParent()); //folder created When folder doesn't exist
            Files.write(path, bytes);

            // Save the file path to the database
            newuser.setImagepath(File);
            return reposity.save(newuser);
        } catch (Exception e) {
//            e.printStackTrace();
            System.out.println(e);
            System.out.println("Something wrong for upload file 😢😢");
        }
        return null;
    }

    @Override
    public ResponseEntity<?> passdata(User data){
        try{
            User user = reposity.findByEmail(data.getEmail());
            if(user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Does not exist");
            }
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @Override
    public User updatedata(@PathVariable Long id,@RequestBody User user){
        System.out.println(user.getDob());
       return reposity.findById(id)
               .map(users -> {
                   users.setFirstname(user.getFirstname());
                   users.setLastname(user.getLastname());
                   users.setDob(user.getDob());
                   users.setAge(user.getAge());
                   users.setBlood_group(user.getBlood_group());
                   users.setMobile(user.getMobile());
                   users.setEmail(user.getEmail());
                   return reposity.save(users);
               }).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }
    @Override
    public User updatepass(@PathVariable Long id,@RequestBody User user){
        return reposity.findById(id)
                .map(users -> {
                    users.setPassword(user.getPassword());
                    return reposity.save(users);
                }).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }
    @Override
    public User getId(@PathVariable Long id){
        return  reposity.findById(id).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }

    @Override
    public String deleteUser(@PathVariable Long id){
        if(!reposity.existsById(id)){
            throw new Usernotfoundexception("User id not found: "+ id);
        }
         reposity.deleteById(id);
        return "User id: "+ id +" has been deleted";
    }

    @Override
    public ResponseEntity<?> findEmail(@PathVariable String email){
        try{
            User user = reposity.findByEmail(email);
            if(user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Does not exist");
            }
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> finddeptno(@PathVariable Integer deptno){
        try {
            List<User> users = reposity.findByDeptno(deptno);
            if(users !=null){
                return ResponseEntity.ok(users);
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Does not exist");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }



    // -----------> Authorities <----------- \\

    @Override
    public Authorities putAuth(@PathVariable Long id,@RequestBody Authorities auth){
        return authreposity.findById(id)
                .map(auths->{
                     auths.setStaff_admin(auth.getStaff_admin());
                     return authreposity.save(auths);
                }).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }

    @Override
    public Authorities putAuthstudent(@PathVariable Long id,@RequestBody Authorities auth){
        return authreposity.findById(id)
                .map(auths->{
                    auths.setStudent(auth.getStudent());
                    return authreposity.save(auths);
                }).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }

    // --------->   Departments <--------- \\

    @Override
    public ResponseEntity<?> postdept(@RequestBody Department dept) {
        Department saveDept =  deptreposity.save(dept);
        return new ResponseEntity<>(saveDept,HttpStatus.CREATED);
    }

    @Override
    public List<?> getdept(){
        return deptreposity.findAll();
    }

    @Override
    public Department getdeptid(@PathVariable Long id){
        return deptreposity.findById(id).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }

    @Override
    public Department getdeptno(@PathVariable Integer deptno){
        return deptreposity.findByDeptno(deptno).orElseThrow(()->new Usernotfoundexception("User not found:"+deptno));
    }

    @Override
    public Department putdept(@PathVariable Integer deptno, @RequestBody Department dept){
        return  deptreposity.findByDeptno(deptno)
                .map(user ->{
                    user.setStudentcount(dept.getStudentcount());
                    return deptreposity.save(user);
                }).orElseThrow(()->new Usernotfoundexception("User not found:"+deptno));
    }

    @Override
    public String deletedpt(@PathVariable Long id){
        if(!deptreposity.existsById(id)){
            throw new Usernotfoundexception("User id not found: "+ id);
        }
        deptreposity.deleteById(id);
        return "User id: "+ id +" has been deleted";
    }

    // --------->   Course   <--------- \\

    @Override
    public ResponseEntity<?> postcourse(@RequestBody Course course){
        Course value =  courseRepository.save(course);
        return new ResponseEntity<>(value,HttpStatus.CREATED);
    }

    @Override
    public List<?> getcourse() {
        return courseRepository.findAll();
    }

    @Override
    public Course getcourseid(@PathVariable Long id) {
        return courseRepository.findById(id).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
    }

    @Override
    public List<Course> findcoursebykey(Long id) {
        return courseRepository.findCoursesNotInStaffcourseByStaffid(id);
    }

    @Override
    public List<Course> findcoursebykeyin(Long id) {
        return courseRepository.findCoursesInStaffcourseByStaffid(id);
    }

    @Override
    public String deletecourse(@PathVariable Long id) {
        if(!courseRepository.existsById(id)){
            throw new Usernotfoundexception("User id not found: "+ id);
        }
        courseRepository.deleteById(id);
        return "User id: "+ id +" has been deleted";
    }

    // --------->   Staff Course   <--------- \\

    @Override
    public ResponseEntity<?> poststaffcourse(@RequestBody Staffcourse course){
        Staffcourse value =  staffcourseRepository.save(course);
        return new ResponseEntity<>(value,HttpStatus.CREATED);
    }

    @Override
    public List<Staffcourse> getstaffcoursebyid(@PathVariable Integer staffid) {
        return staffcourseRepository.findByStaffid(staffid);
    }
}

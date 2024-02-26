package com.form.log_form.Contoller;

import com.form.log_form.Model.Authorities;
import com.form.log_form.Model.Department;
import com.form.log_form.Model.User;
import com.form.log_form.Service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class UserController {

    @Autowired
    public Userservice service;

    @GetMapping
    public String hello(){
        return "hello";
    }

    @GetMapping("/getuser")
    public List<User> getUser(){
        return service.getUser();
    }

    @PostMapping(path = "/postuser", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  User saveUser(@RequestPart("user") User newuser,@RequestPart("file") MultipartFile file){
        return service.saveUser(newuser,file);
    }

    @PostMapping("/text")
    public ResponseEntity<?> passdata(@RequestBody User data){
        return service.passdata(data);
    }

    @PutMapping("/update/{id}")
    public User updatedata(@PathVariable Long id,@RequestBody User user){
        return  service.updatedata(id,user);
    }

    @PutMapping("/updatepass/{id}")
    public User updatepass(@PathVariable Long id,@RequestBody User user){
        return  service.updatepass(id,user);
    }

    @GetMapping("/getuserid/{id}")
    public User getbyid(@PathVariable Long id){
        return service.getId(id);
    }

    @DeleteMapping("/deleteuser/{id}")
    public String deleteuser(@PathVariable Long id){
        return service.deleteUser(id);
    }

    @GetMapping(path = "/findemail/{email}")
    public ResponseEntity<?> findEmail(@PathVariable String email){
        return service.findEmail(email);
    }

    @GetMapping(path = "/userdeptno/{deptno}")
    public ResponseEntity<?> finddeptno(@PathVariable Integer deptno){
        return service.finddeptno(deptno);
    }

    // -----------> Authorities <----------- \\

    @PutMapping(path = "/staffauth/{id}")
    public Authorities putAuth(@PathVariable Long id,@RequestBody Authorities auth)
    {
        return service.putAuth(id,auth);
    }

    @PutMapping(path = "/studentauth/{id}")
    public Authorities putAuthstudent(@PathVariable Long id,@RequestBody Authorities auth)
    {
        return service.putAuthstudent(id,auth);
    }

    // --------->   Departments <--------- \\

    @PostMapping(path = "/dept")
    public ResponseEntity<?> postdept(@RequestBody Department dept){
        return service.postdept(dept);
    }

    @GetMapping(path = "/getdept")
    public  List<?> getdept(){
        return service.getdept();
    }

    @GetMapping(path = "/getdeptid/{id}")
    public Department getdeptid(@PathVariable Long id){
        return service.getdeptid(id);
    }

    @GetMapping(path = "/getdeptno/{deptno}")
    public Department getdeptno(@PathVariable Integer deptno){
        return service.getdeptno(deptno);
    }

    @PutMapping(path = "/updatedept/{deptno}")
    public Department putdept(@PathVariable Integer deptno, @RequestBody Department dept){
        return service.putdept(deptno,dept);
    }

    @DeleteMapping(path = "/deletedept/{id}")
    public String deletedpt(@PathVariable Long id){
        return service.deletedpt(id);
    }
}

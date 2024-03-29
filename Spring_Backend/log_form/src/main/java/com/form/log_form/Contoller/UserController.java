package com.form.log_form.Contoller;

import com.form.log_form.Model.*;
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

    // --------->   User   <--------- \\

    @GetMapping
    public String hello(){
        return "hello";
    }

    @GetMapping(path = "/getuser")
    public List<User> getUser(){
        return service.getUser();
    }

    @PostMapping(path = "/postuser", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  User saveUser(@RequestPart("user") User newuser,@RequestPart("file") MultipartFile file){
        return service.saveUser(newuser,file);
    }

    @PostMapping(path = "/text")
    public ResponseEntity<?> passdata(@RequestBody User data){
        return service.passdata(data);
    }

    @PutMapping(path = "/update/{id}")
    public User updatedata(@PathVariable Long id,@RequestBody User user){
        return  service.updatedata(id,user);
    }

    @PutMapping(path = "/updatepass/{id}")
    public User updatepass(@PathVariable Long id,@RequestBody User user){
        return  service.updatepass(id,user);
    }

    @GetMapping(path = "/getuserid/{id}")
    public User getbyid(@PathVariable Long id){
        return service.getId(id);
    }

    @DeleteMapping(path = "/deleteuser/{id}")
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

    @GetMapping(path = "/getuserbystaffidcourseid/{courseno}/{staffid}")
    public List<User> getuserbystaffidcourseid(@PathVariable Integer courseno,@PathVariable Integer staffid){
        return service.getuserbystaffidcourseid(courseno,staffid);
    }

    // ----------->   Authorities  <----------- \\

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

    // --------->   Departments   <--------- \\

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

    // --------->   Course   <--------- \\

    @PostMapping(path = "/course")
    public ResponseEntity<?> postcourse(@RequestBody Course course){
        return service.postcourse(course);
    }

    @GetMapping(path = "/getcourse")
    public List<?> getcourse(){
        return service.getcourse();
    }

    @GetMapping(path = "/getcourseid/{id}")
    public Course getcourseid(@PathVariable Long id){
        return service.getcourseid(id);
    }

    @GetMapping(path = "/findcoursebystaffkey/{id}")
    public List<Course> findcoursebykey(@PathVariable Long id){
        return service.findcoursebykey(id);
    }

    @GetMapping(path = "/findcoursebystaffkeyin/{id}")
    public List<Course> findcoursebykeyin(@PathVariable Long id){
        return service.findcoursebykeyin(id);
    }

    @DeleteMapping(path = "/deletecourse/{id}")
    public String deletecourse(@PathVariable Long id){
        return service.deletecourse(id);
    }

    // --------->  Staff Course   <--------- \\

    @PostMapping(path = "/poststaffcourse")
    public ResponseEntity<?> poststaffcourse(@RequestBody Staffcourse course){
        return service.poststaffcourse(course);
    }

    @GetMapping(path = "/getstaffcourse")
    public List<Staffcourse> getstaffcourseby(){
        return service.getstaffcourseby();
    }

    @GetMapping(path = "/getstaffcourseid/{staffid}")
    public List<Staffcourse> getstaffcoursebyid(@PathVariable Integer staffid){
        return service.getstaffcoursebyid(staffid);
    }

    @GetMapping(path = "/getstaffcoursebydeptno/{deptno}")
    public List<Staffcourse> getstaffcoursebydeptno(@PathVariable Integer deptno){
        return service.getstaffcoursebydeptno(deptno);
    }

    @GetMapping(path = "/getstaffcoursecourseno/{courseno}/{staffid}")
    public Staffcourse getstaffcoursebycourseno(@PathVariable Integer courseno, @PathVariable Integer staffid){
        return service.getstaffcoursebycourseno(courseno,staffid);
    }

    @PutMapping(path = "/putstaffcoursecount/{courseno}/{staffid}")
    public Staffcourse putstaffcoursebycourseno(@PathVariable Integer courseno,@PathVariable Integer staffid, @RequestBody Staffcourse staff ){
        return service.putstaffcoursebycourseno(courseno,staffid,staff);
    }

    @GetMapping(path = "/getstaffcoursebystuid/{studentid}/{deptno}")
    public List<Staffcourse> getstaffcoursebystuid(@PathVariable Integer studentid,@PathVariable Integer deptno){
        return service.getstaffcoursebystuid(studentid,deptno);
    }

    // --------->  Student Course   <--------- \\

    @PostMapping(path = "/poststucourse")
    public ResponseEntity<?> poststucourse(@RequestBody Studentscourse stucourse){
        return service.poststucourse(stucourse);
    }

    @GetMapping(path = "/getstudentcoursebyid/{studentid}")
    public List<Studentscourse> getstudentcoursebystudentid(@PathVariable Integer studentid){
        return service.getstudentcoursebystudentid(studentid);
    }
}

package com.form.log_form.Contoller;

import com.form.log_form.Model.PasswordData;
import com.form.log_form.Model.User;
import com.form.log_form.Service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000/")
public class UserController {

    @Autowired
    public Userservice service;

    @GetMapping("/getuser")
    public List<User> getUser(){
        return service.getUser();
    }
    @PostMapping("/postuser")
    public  User saveUser(@RequestBody User newuser){
        return service.saveUser(newuser);
    }
    @PostMapping("/text")
    public User passdata(@RequestBody PasswordData data){
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
}

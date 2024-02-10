package com.form.log_form.Contoller;

import com.form.log_form.Model.Authorities;
import com.form.log_form.Model.Image;
import com.form.log_form.Model.PasswordData;
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
@CrossOrigin("http://localhost:3000/")
public class UserController {

    @Autowired
    public Userservice service;

    @GetMapping("/getuser")
    public List<User> getUser(){
        return service.getUser();
    }

    @PostMapping(path = "/postuser", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public  User saveUser(@RequestPart("user") User newuser,@RequestPart("file") MultipartFile file){
        return service.saveUser(newuser,file);
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

    @DeleteMapping("/deleteuser/{id}")
    public String deleteuser(@PathVariable Long id){
        return service.deleteUser(id);
    }

//    @PostMapping("/uploads")
//    public Image upload(@RequestParam("file") MultipartFile file){
//        return  service.Upload(file);
//    }
//
//    @GetMapping("/getimage")
//    public List<Image> getimage(){
//        return service.GetImage();
//    }
//
//    @GetMapping("/getimageid/{id}")
//    public Image getimgid(@PathVariable Long id){
//        return  service.GetImgId(id);
//    }

    @GetMapping(path = "/findemail/{email}")
    public ResponseEntity<?> findEmail(@PathVariable String email){
        return service.findEmail(email);
    }

    @PutMapping(path = "/staffauth/{id}")
    public Authorities putAuth(@PathVariable Long id,@RequestBody Authorities auth)
    {
        return service.putAuth(id,auth);
    }

}

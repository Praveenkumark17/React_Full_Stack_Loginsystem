package com.form.log_form.ServiceImp;

import com.form.log_form.Exception.Usernotfoundexception;
import com.form.log_form.Model.Authorities;
import com.form.log_form.Model.User;
import com.form.log_form.Repository.AutoritiesReapository;
import com.form.log_form.Repository.UserRepository;
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
}

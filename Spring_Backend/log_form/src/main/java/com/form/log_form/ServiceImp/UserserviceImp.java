package com.form.log_form.ServiceImp;

import com.form.log_form.Exception.Usernotfoundexception;
//import com.form.log_form.Model.Image;
import com.form.log_form.Model.PasswordData;
import com.form.log_form.Model.User;
import com.form.log_form.Repository.ImageRepo;
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
    public ImageRepo imagerepo;

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
    public User passdata(PasswordData data){
        User userdata = null;
        if(data.getUserid() != null) {
            userdata = reposity.findByUserid(data.getUserid());
            if(userdata == null) {
                System.out.println("User Does not exist");
            }
        }else {
        	userdata = null;
        }
        System.out.println(data.getUserid());
        return userdata;
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
        System.out.println(user.getDob());
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

//    @Override
//    public Image Upload(MultipartFile file){
//        try {
//            // Save the file locally
//            byte[] bytes = file.getBytes();
//            String File = file.getOriginalFilename();
//            Path path = Paths.get("../React_Frontend/src/Images/" + File);
//            Files.createDirectories(path.getParent()); //folder created When folder doesn't exist
//            Files.write(path, bytes);
//
//            // Save the file path to the database
//            Image image = new Image();
//            image.setImagepath(File);
//            imagerepo.save(image);
//            return image;
//        } catch (Exception e) {
////            e.printStackTrace();
//            System.out.println(e);
//            System.out.println("Something wrong for upload file 😢😢");
//        }
//        return null;
//    }
//
//    @Override
//    public List<Image> GetImage(){
//        return imagerepo.findAll();
//    }
//
//    @Override
//    public Image GetImgId(Long id){
//        return imagerepo.findById(id).orElseThrow(()->new Usernotfoundexception("User not found:"+id));
//    }

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


}

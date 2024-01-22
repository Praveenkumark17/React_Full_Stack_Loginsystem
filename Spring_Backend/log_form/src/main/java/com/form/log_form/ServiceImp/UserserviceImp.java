package com.form.log_form.ServiceImp;

import com.form.log_form.Exception.Usernotfoundexception;
import com.form.log_form.Model.PasswordData;
import com.form.log_form.Model.User;
import com.form.log_form.Repository.UserRepository;
import com.form.log_form.Service.Userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class UserserviceImp implements Userservice {

    @Autowired
    public UserRepository reposity;
    @Override
    public List<User> getUser(){
        return reposity.findAll();
    }
    @Override
    public User saveUser(User newuser){
        return reposity.save(newuser);
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

}

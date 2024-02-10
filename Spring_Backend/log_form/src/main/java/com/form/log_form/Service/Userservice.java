package com.form.log_form.Service;

import com.form.log_form.Model.Authorities;
import com.form.log_form.Model.PasswordData;
import com.form.log_form.Model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface Userservice {
    public List<User> getUser();

    public  User saveUser(User newuser,MultipartFile file);

    public User passdata(PasswordData data);

    public User updatedata(Long id, User user);

    public User updatepass(Long id, User user);

    public User getId(Long id);

    public String deleteUser(Long id);

//    public Image Upload(MultipartFile file);
//
//    public List<Image> GetImage();
//
//    public Image GetImgId(Long id);

    public ResponseEntity<?> findEmail(String email);

    public Authorities putAuth (Long id,Authorities auth);
}

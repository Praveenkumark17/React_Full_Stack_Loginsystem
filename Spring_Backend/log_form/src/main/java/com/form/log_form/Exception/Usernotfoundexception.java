package com.form.log_form.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class Usernotfoundexception extends RuntimeException {
    public Usernotfoundexception(){

    }
    public Usernotfoundexception(String msg){
        super(msg);
    }

}
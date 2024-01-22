package com.form.log_form;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AESEncryption {
    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY = "Praveen12GmqG7Io";

    public static String encrypt(String plainText) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static void main(String[] args) {
        String plainText = "Praveen@1";
        try {
            String encryptedText = encrypt(plainText);
            System.out.println("Encrypted Text : " + encryptedText);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package com.form.log_form;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class AESDecryption {
    private static final String ALGORITHM = "AES";
    private static final String SECRET_KEY = "Praveen12GmqG7Io";

    public static String decrypt(String encryptedText) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, keySpec);
        byte[] decodedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return new String(decryptedBytes);
    }

    public static void main(String[] args) {
        String encryptedText = "U2FsdGVkX1/P3rLylCeb4OUnLKPcT8BSO6fJD5dCdNs=";
        try {
            String decryptedText = decrypt(encryptedText);
            System.out.println("Decrypted Text : " + decryptedText);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

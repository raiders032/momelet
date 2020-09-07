package com.swm.sprint1.exception;

public class JwtTokenNotValidException extends RuntimeException {
    public JwtTokenNotValidException(String message) {
        super(message);
    }
}

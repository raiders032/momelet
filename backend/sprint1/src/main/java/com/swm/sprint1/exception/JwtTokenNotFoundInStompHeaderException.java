package com.swm.sprint1.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class JwtTokenNotFoundInStompHeaderException extends RuntimeException {
    public JwtTokenNotFoundInStompHeaderException(String message) {
        super(message);
    }

    public JwtTokenNotFoundInStompHeaderException(String message, Throwable cause) {
        super(message, cause);
    }
}

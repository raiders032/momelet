package com.swm.sprint1.exception;

import com.swm.sprint1.payload.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApiResponse> handleAllExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(LocalDateTime.now(),false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ApiResponse> handleBadRequestExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(LocalDateTime.now(),false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<ApiResponse> handleResourceNotFoundExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(LocalDateTime.now(),false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
    public final ResponseEntity<ApiResponse> handleOAuth2AuthenticationProcessingExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(LocalDateTime.now(),false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


}

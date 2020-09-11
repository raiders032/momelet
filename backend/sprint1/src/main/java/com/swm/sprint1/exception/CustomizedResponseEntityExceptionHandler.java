package com.swm.sprint1.exception;

import com.swm.sprint1.payload.response.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;

@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApiResponse> handleAllExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ApiResponse> handleBadRequestExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<ApiResponse> handleResourceNotFoundExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
    public final ResponseEntity<ApiResponse> handleOAuth2AuthenticationProcessingExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RestaurantLessThan7Exception.class)
    public final ResponseEntity<ApiResponse> handleRestaurantLessThan7Exceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public final ResponseEntity<ApiResponse> handleExpiredJwtExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false, "jwt.expired", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JwtException.class)
    public final ResponseEntity<ApiResponse> handleJwtExceptions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false, ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotSupportedExtension.class)
    public final ResponseEntity<ApiResponse> handleNotSupportedExtensions(Exception ex, WebRequest request) {
        ApiResponse response = new ApiResponse(false, ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ConstraintViolationException.class)
    public final ResponseEntity<ApiResponse> handleConstraintViolationExceptions(Exception ex, WebRequest request){
        ApiResponse response = new ApiResponse(false, "100", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

}

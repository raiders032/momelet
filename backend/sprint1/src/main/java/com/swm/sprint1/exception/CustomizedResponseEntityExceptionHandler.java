package com.swm.sprint1.exception;

import com.swm.sprint1.payload.response.ApiResponse;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import javax.validation.ConstraintViolationException;

@RestController
@ControllerAdvice
public class CustomizedResponseEntityExceptionHandler {
    
    private final Logger logger = LoggerFactory.getLogger(CustomizedResponseEntityExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApiResponse> handleAllExceptions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(BadRequestException.class)
    public final ResponseEntity<ApiResponse> handleBadRequestExceptions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<ApiResponse> handleResourceNotFoundExceptions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OAuth2AuthenticationProcessingException.class)
    public final ResponseEntity<ApiResponse> handleOAuth2AuthenticationProcessingExceptions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RestaurantLessThan7Exception.class)
    public final ResponseEntity<ApiResponse> handleRestaurantLessThan7Exceptions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,"303", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(JwtException.class)
    public final ResponseEntity<ApiResponse> handleJwtExceptions(Exception ex, WebRequest request) {
        ApiResponse response = null;
        if(ex.getClass().equals(SignatureException.class)){
            logger.error("Invalid JWT signature");
            response = new ApiResponse(false,"400", "Invalid JWT signature", 
                    request.getDescription(false));
        }
        else if(ex.getClass().equals(MalformedJwtException.class)){
            logger.error("Invalid JWT token");
            response = new ApiResponse(false,"401", "Invalid JWT token", 
                    request.getDescription(false));
        }
        else if(ex.getClass().equals(ExpiredJwtException.class)){
            logger.error("Expired JWT token");
            response = new ApiResponse(false,"402", "Expired JWT token", 
                    request.getDescription(false));
        }
        else if(ex.getClass().equals(UnsupportedJwtException.class)){
            logger.error("IUnsupported JWT token");
            response = new ApiResponse(false,"403", "Unsupported JWT token", 
                    request.getDescription(false));
        }
        else{
            logger.error(ex.getMessage());
            response = new ApiResponse(false,"404", "Invalid JWT token",
                    request.getDescription(false));
        }
       
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public final ResponseEntity<ApiResponse> handleMissingServletRequestParameterExceptions(Exception ex, WebRequest request){
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false, "100", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ConstraintViolationException.class, MethodArgumentNotValidException.class, BindingException.class})
    public final ResponseEntity<ApiResponse> handleConstraintViolationExceptions(Exception ex, WebRequest request){
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false, "101", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotSupportedExtension.class)
    public final ResponseEntity<ApiResponse> handleNotSupportedExtensions(Exception ex, WebRequest request) {
        logger.error(ex.getMessage());
        ApiResponse response = new ApiResponse(false,"102", ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}

package com.swm.sprint1.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse{
    private LocalDateTime dateTime;
    private boolean success;
    private String message;
    private String detail;
    private Map<String,Object> data = new HashMap<>();

    public void putData(String key, Object value){
        this.data.put(key, value);
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(LocalDateTime dateTime, boolean success) {
        this.dateTime = dateTime;
        this.success = success;
    }

    public ApiResponse(LocalDateTime dateTime, boolean success, String message) {
        this.dateTime = dateTime;
        this.success = success;
        this.message = message;
    }

    public ApiResponse(LocalDateTime dateTime, boolean success, String message, String detail) {
        this.dateTime = dateTime;
        this.success = success;
        this.message = message;
        this.detail = detail;
    }
}

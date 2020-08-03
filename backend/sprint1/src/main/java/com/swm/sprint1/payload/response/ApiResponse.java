package com.swm.sprint1.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    private LocalDateTime dateTime;
    private boolean success;
    private String message;
    private String detail;

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(LocalDateTime dateTime, boolean success, String message) {
        this.dateTime=dateTime;
        this.success=success;
        this.message=message;
    }
}

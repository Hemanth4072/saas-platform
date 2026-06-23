package com.saas.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private String status = "error";

    public ErrorResponse(String message) {
        this.message = message;
    }
}

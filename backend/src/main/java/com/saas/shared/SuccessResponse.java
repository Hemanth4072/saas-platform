package com.saas.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SuccessResponse {
    private String message;
    private String status = "success";

    public SuccessResponse(String message) {
        this.message = message;
    }
}

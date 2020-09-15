package com.swm.sprint1.payload.request;

import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@NoArgsConstructor
@Getter
@Setter
public class JwtDto {

    @ApiParam(value = "jwt 토큰", required = true)
    @NotBlank(message = "jwt 토큰이 비어있습니다.")
    private String jwt;

}

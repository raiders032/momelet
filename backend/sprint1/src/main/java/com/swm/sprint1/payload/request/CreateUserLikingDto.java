package com.swm.sprint1.payload.request;

import com.swm.sprint1.domain.Liking;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class CreateUserLikingDto {

    @NotNull @Min(1)
    private Long userId;

    @NotNull @Min(1)
    private Long restaurantId;

    @NotNull @Min(-180) @Max(180)
    private BigDecimal userLongitude;

    @NotNull @Min(-90) @Max(90)
    private BigDecimal userLatitude;

    @NotNull
    private Liking liking;
}
package com.swm.sprint1.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@NoArgsConstructor
public class UpdateUserRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String imageUrl;

    @NotEmpty(message = "카테고리가 비어있습니다.")
    private List<String> categories;

    @Builder
    public UpdateUserRequest(@NotBlank String name, @NotBlank String imageUrl, @NotEmpty(message = "카테고리가 비어있습니다.") List<String> categories) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.categories = categories;
    }

}

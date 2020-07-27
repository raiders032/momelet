package com.swm.sprint1.payload.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class GetUserResponse {
    private Long id;
    private String email;
    private String name;
    private String profile;
    private List<String> categories;

    public GetUserResponse(Long id, String name,String email,String profile, List<String> categories) {
        this.id=id;
        this.name=name;
        this.email=email;
        this.profile=profile;
        this.categories=categories;
    }
}

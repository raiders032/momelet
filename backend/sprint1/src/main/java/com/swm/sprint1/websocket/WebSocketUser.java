package com.swm.sprint1.websocket;

import com.swm.sprint1.domain.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.Principal;

@NoArgsConstructor
@Getter
public class WebSocketUser implements Principal {
    private Long id;
    private String email;
    private String username;
    private User user;

    public WebSocketUser(User user) {
        this.id=user.getId();
        this.email=user.getEmail();
        this.username = user.getName();
        this.user = user;
    }

    @Override
    public String getName() {
        return String.valueOf(id);
    }
}

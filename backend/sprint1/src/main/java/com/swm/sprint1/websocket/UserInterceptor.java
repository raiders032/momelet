package com.swm.sprint1.websocket;

import com.swm.sprint1.domain.User;
import com.swm.sprint1.exception.JwtTokenNotFoundInStompHeaderException;
import com.swm.sprint1.exception.ResourceNotFoundException;
import com.swm.sprint1.repository.user.UserRepository;
import com.swm.sprint1.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Objects;

@RequiredArgsConstructor
@Component
public class UserInterceptor implements ChannelInterceptor {

    private final TokenProvider tokenProvider;

    private final UserRepository userRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String jwt = getJwt(accessor);
            Long userID = tokenProvider.getUserIdFromToken(jwt);
            User user = userRepository.findById(userID).orElseThrow(() -> new ResourceNotFoundException("User", "ID", userID));
            accessor.setUser(new WebSocketUser(user));
        }
        return message;
    }

    private String getJwt(StompHeaderAccessor accessor){
        if(accessor.containsNativeHeader("Authorization")){
            String bearerToken = Objects.requireNonNull(accessor.getNativeHeader("Authorization")).get(0);
            if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
                return bearerToken.substring(6);
            }
        }
        else{
            throw new JwtTokenNotFoundInStompHeaderException("Stopm Header에 Authorization가 없습니다.");
        }
        return null;
    }
}
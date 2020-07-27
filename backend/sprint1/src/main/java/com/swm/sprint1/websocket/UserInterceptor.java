package com.swm.sprint1.websocket;

import com.swm.sprint1.security.CustomUserDetailsService;
import com.swm.sprint1.security.TokenProvider;
import com.swm.sprint1.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class UserInterceptor extends ChannelInterceptorAdapter {

    private final TokenProvider tokenProvider;

    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                List<String> authorization1 = accessor.getNativeHeader("Authorization");
                String jwt = authorization1.get(0).substring(6);
                Long userIdFromToken = tokenProvider.getUserIdFromToken(jwt);
                UserPrincipal userDetails = (UserPrincipal)customUserDetailsService.loadUserById(userIdFromToken);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                accessor.setUser(userDetails);
        }
        return message;
    }
}
package com.swm.sprint1.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swm.sprint1.payload.response.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;

@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Logger logger = LoggerFactory.getLogger(TokenAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            if (StringUtils.hasText(jwt)) {
                try {
                    tokenProvider.validateToken(jwt);
                } catch (SignatureException exception) {
                    logger.error("Invalid JWT signature");
                    ApiResponse apiResponse = ApiResponse.builder()
                            .dateTime(LocalDateTime.now().toString())
                            .success(false)
                            .errorCode("400")
                            .message("Invalid JWT signature")
                            .build();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write(convertObjectToJson(apiResponse));
                    return;
                } catch (MalformedJwtException exception) {
                    logger.error("Invalid JWT token");
                    ApiResponse apiResponse = ApiResponse.builder()
                            .dateTime(LocalDateTime.now().toString())
                            .success(false)
                            .errorCode("401")
                            .message("Invalid JWT token")
                            .build();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write(convertObjectToJson(apiResponse));
                    return;
                } catch (ExpiredJwtException exception) {
                    logger.error("Expired JWT token");
                    ApiResponse apiResponse = ApiResponse.builder()
                            .dateTime(LocalDateTime.now().toString())
                            .success(false)
                            .errorCode("402")
                            .message("Expired JWT token")
                            .build();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write(convertObjectToJson(apiResponse));
                    return;
                } catch (UnsupportedJwtException exception) {
                    logger.error("IUnsupported JWT token");
                    ApiResponse apiResponse = ApiResponse.builder()
                            .dateTime(LocalDateTime.now().toString())
                            .success(false)
                            .errorCode("403")
                            .message("IUnsupported JWT token")
                            .build();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write(convertObjectToJson(apiResponse));
                    return;
                } catch (Exception exception) {
                    logger.error(exception.getMessage());
                    ApiResponse apiResponse = ApiResponse.builder()
                            .dateTime(LocalDateTime.now().toString())
                            .success(false)
                            .errorCode("404")
                            .message("Invalid JWT token")
                            .build();
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write(convertObjectToJson(apiResponse));
                    return;
                }

                Long userId = tokenProvider.getUserIdFromToken(jwt);

                UserDetails userDetails = customUserDetailsService.loadUserById(userId);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (
                Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        logger.debug("TokenAuthenticationFilter 통과");
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        return objectMapper.writeValueAsString(object);
    }
}

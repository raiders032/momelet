package com.swm.sprint1.security;

import com.swm.sprint1.config.AppProperties;
import com.swm.sprint1.domain.UserRefreshToken;
import com.swm.sprint1.repository.user.UserRefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final AppProperties appProperties;

    public List<String> createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();
        Date now = new Date();
        Date accessExpiryDate = new Date(now.getTime() + 60*60* 1000);
        Date refreshExpiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        String accessToken = Jwts.builder()
                        .setSubject(Long.toString(userPrincipal.getId()))
                        .setIssuedAt(new Date())
                        .setExpiration(accessExpiryDate)
                        .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                        .compact() ;

        String refreshToken = Jwts.builder()
                       .setSubject(Long.toString(userPrincipal.getId()))
                       .setIssuedAt(new Date())
                       .setExpiration(refreshExpiryDate)
                       .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                       .compact();

        Optional<UserRefreshToken> byUserId = userRefreshTokenRepository.findByUserId(userId);

        if(byUserId.isPresent())
            byUserId.get().updateRefreshToken(refreshToken);
        else
            userRefreshTokenRepository.save(new UserRefreshToken(userId, refreshToken));

        return Arrays.asList(accessToken, refreshToken);
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public void validateToken(String authToken) {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
    }

    public boolean validateRefreshToken(Long userId, String refreshToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(refreshToken);
        }
        catch (ExpiredJwtException e){
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), "refresh "+ e.getMessage());
        }
        return userRefreshTokenRepository.existsByUserIdAndRefreshToken(userId, refreshToken);
    }
}

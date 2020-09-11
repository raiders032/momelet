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
import org.springframework.util.Base64Utils;

import java.text.SimpleDateFormat;
import java.util.*;

@Transactional
@RequiredArgsConstructor
@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final AppProperties appProperties;



    public List<Token> createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Long userId = userPrincipal.getId();
        Date now = new Date();
        Date accessExpiryDate = new Date(now.getTime() + 60*60* 1000);
        Date refreshExpiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());

        String accessTokenString = Jwts.builder()
                        .setSubject(Long.toString(userPrincipal.getId()))
                        .setIssuedAt(new Date())
                        .setExpiration(accessExpiryDate)
                        .signWith(SignatureAlgorithm.HS512, encodedJwt)
                        .compact() ;

        String refreshTokenString = Jwts.builder()
                       .setSubject(Long.toString(userPrincipal.getId()))
                       .setIssuedAt(new Date())
                       .setExpiration(refreshExpiryDate)
                       .signWith(SignatureAlgorithm.HS512, encodedJwt)
                       .compact();

        Optional<UserRefreshToken> byUserId = userRefreshTokenRepository.findByUserId(userId);

        if(byUserId.isPresent())
            byUserId.get().updateRefreshToken(refreshTokenString);
        else
            userRefreshTokenRepository.save(new UserRefreshToken(userId, refreshTokenString));

        Token accessToken = new Token(accessTokenString, accessExpiryDate);
        Token refreshToken = new Token(refreshTokenString, refreshExpiryDate);
        return Arrays.asList(accessToken, refreshToken);
    }

    public Long getUserIdFromToken(String token) {
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());
        Claims claims = Jwts.parser()
                .setSigningKey(encodedJwt)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public void validateToken(String authToken) {
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());
        Jwts.parser().setSigningKey(encodedJwt);
    }

    public boolean validateRefreshToken(Long userId, String refreshToken) {
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());
        try {
            Jwts.parser().setSigningKey(encodedJwt);
        }
        catch (ExpiredJwtException e){
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), "refresh "+ e.getMessage());
        }
        return userRefreshTokenRepository.existsByUserIdAndRefreshToken(userId, refreshToken);
    }
}

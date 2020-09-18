package com.swm.sprint1.security;

import com.swm.sprint1.config.AppProperties;
import com.swm.sprint1.domain.UserRefreshToken;
import com.swm.sprint1.exception.CustomJwtException;
import com.swm.sprint1.repository.user.UserRefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

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
        Date accessExpiryDate = new Date(now.getTime() + appProperties.getAuth().getAccessTokenExpirationMsec());
        Date refreshExpiryDate = new Date(now.getTime() + appProperties.getAuth().getRefreshTokenExpirationMsec());
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());

        String accessTokenString = Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .claim("type", "access")
                .setIssuedAt(new Date())
                .setExpiration(accessExpiryDate)
                .signWith(SignatureAlgorithm.HS512, encodedJwt)
                .compact() ;

        String refreshTokenString = Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .claim("type", "refresh")
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

    public String getTypeFromToken(String token) {
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());
        Claims claims = Jwts.parser()
                .setSigningKey(encodedJwt)
                .parseClaimsJws(token)
                .getBody();

        return claims.get("type").toString();
    }

    public void validateToken(String authToken) {
        String encodedJwt = Base64Utils.encodeToString(appProperties.getAuth().getTokenSecret().getBytes());
        Jwts.parser().setSigningKey(encodedJwt).parseClaimsJws(authToken);
    }

    public void validateAccessToken(String accessToken){
        if(!getTypeFromToken(accessToken).equals("access")) {
            logger.error("토큰 타입이 불일치 합니다. accsse token이 필요합니다");
            throw new CustomJwtException("토큰 타입이 불일치 합니다. accsse token이 필요합니다.", "404");
        }
        validateToken(accessToken);
    }

    public void validateRefreshToken(Long userId, String refreshToken) {
        if(!getTypeFromToken(refreshToken).equals("refresh")) {
            logger.error("토큰 타입이 불일치 합니다. refresh token이 필요합니다");
            throw new CustomJwtException("토큰 타입이 불일치 합니다. refresh token이 필요합니다.", "404");
        }
        validateToken(refreshToken);
        if(!userRefreshTokenRepository.existsByUserIdAndRefreshToken(userId, refreshToken)) {
            logger.error("유저(" + userId + ") 저장된 리프레시 토큰과 일치하지 않습니다.");
            throw new CustomJwtException("유저(" + userId + ") 저장된 리프레시 토큰과 일치하지 않습니다.", "403");
        }

    }
}

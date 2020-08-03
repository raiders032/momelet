package com.swm.sprint1.websocket;

import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Repository
public class WebSocketUserRepository {

    private Map<Long, WebSocketUser> userMap = new HashMap<>();

    public WebSocketUser save(WebSocketUser user) {
        userMap.put(user.getId(),user);
        return user;
    }

    public Optional<WebSocketUser> findById(Long userId){
        Assert.notNull(userId, "ID_MUST_NOT_BE_NULL");
        if(userMap.containsKey(userId)){
            return Optional.of(userMap.get(userId));
        }
        else{
            return Optional.ofNullable(null);
        }
    }

    public List<WebSocketUser> findAll(){
        return userMap.values().stream().collect(Collectors.toList());
    }

    public int size(){
        return userMap.size();
    }

    public void delete(WebSocketUser user) {
        if(!userMap.containsKey(user.getId()))
            throw new IllegalArgumentException("존재하지 않은 ID입니다.");
        userMap.remove(user.getId());
    }

    public void delete(Long userId) {
        if(!userMap.containsKey(userId))
            throw new IllegalArgumentException("존재하지 않은 ID입니다.");
        userMap.remove(userId);
    }

    public boolean existsById(Long id){
        if(userMap.containsKey(id))
            return true;
        else
            return false;
    }
}

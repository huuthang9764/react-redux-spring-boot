//package com.example.FinalExam.security.UserPrinciple;
//
//import com.example.FinalExam.Entity.Account.Account;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class UserPrinciple implements UserDetails {
//    private static final long serialVersionUID = 1L;
//
//    private Long id;
//
//    private String username;
//
//    private String email;
//
//    @JsonIgnore
//    private String password;
//
//    private Collection<? extends GrantedAuthority> role;
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return role;
//    }
//
//    public UserPrinciple() {
//    }
//
//    public UserPrinciple(Long id, String username, String email, String password, Collection<? extends GrantedAuthority> role) {
//        this.id = id;
//        this.username = username;
//        this.email = email;
//        this.password = password;
//        this.role = role;
//    }
//
//    public static UserPrinciple build(Account users) {
//        List<GrantedAuthority> authorities = users.getRole()
//                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
//                .collect(Collectors.toList());
//        return new UserPrinciple(
//                users.getId(),
//                users.getName(),
//                users.getUsername(),
//                users.getEmail(),
//                users.getPassword(),
//                users.getAvatar(),
//                users.getEnabled(),
//                authorities);
//    }
//    @Override
//    public String getPassword() {
//        return null;
//    }
//
//    @Override
//    public String getUsername() {
//        return null;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return false;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return false;
//    }
//}

//package com.example.FinalExam.security.UserPrinciple;
//
//import com.example.FinalExam.Entity.Account.Account;
//import com.example.FinalExam.Repository.IAccountRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserDetailService implements UserDetailsService {
//    @Autowired
//    IAccountRepository accountRepository;
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Account users = accountRepository.findByUsername(username)
//                .orElseThrow(()-> new UsernameNotFoundException("User not found -> user name or password"+username));
//        return UserPrinciple.build(users);
//    }
//}

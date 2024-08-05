package com.show.show.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.show.show.security.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

 // Bean for password encoder, using BCryptPasswordEncoder for secure password hashing
    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

 // Security filter chain configuration for HTTP security settings
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) //cross-site request forgery
            .authorizeHttpRequests(authz -> authz
            // Define authorization rules based on URL patterns and authorities
                .requestMatchers("/admin/**").hasAuthority("ADMIN")
                .requestMatchers("/user/**").hasAuthority("USER")
                .requestMatchers("/registration", "/login", "/adminlogin", "/css/**", "/admin_users/**", "/auth-status").permitAll()
                .requestMatchers("/shows/**").permitAll() 
                .requestMatchers("/search").permitAll() 
                .requestMatchers("/shows/airing-schedule/**").permitAll() 
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
            	// Configure custom login page and login processing URL
                .loginPage("/login")
                .usernameParameter("email")
                .loginProcessingUrl("/perform_login")
                .permitAll()
            )
            .logout(logout -> logout
            	// Configure logout URL and redirect after logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
            );
        return http.build();
    }
      
 // Bean for exposing AuthenticationManager bean
    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
            .userDetailsService(customUserDetailsService)
            .passwordEncoder(passwordEncoder())
            .and()
            .build();
    }

 // Configure AuthenticationManager to use custom UserDetailsService and password encoder
    @Autowired
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
    }
}


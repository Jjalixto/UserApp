package com.joel.backend.usersapp.backendusersapp.auth;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.joel.backend.usersapp.backendusersapp.auth.filters.JwtAuthenticationFilter;
import com.joel.backend.usersapp.backendusersapp.auth.filters.JwtValidationFilter;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception
    {
        return http.authorizeHttpRequests()
        .requestMatchers(HttpMethod.GET,"/users").permitAll()
        .requestMatchers(HttpMethod.GET,"/users/{id}").hasAnyRole("USER","ADMIN")
        .requestMatchers(HttpMethod.POST,"/users").hasRole("ADMIN")
        .requestMatchers("/users/**").hasRole("ADMIN")
        // .requestMatchers(HttpMethod.PUT,"/users/{id}").hasRole("ADMIN")
        // .requestMatchers(HttpMethod.DELETE,"/users/{id}").hasRole("ADMIN")
        .anyRequest().authenticated()
        .and()
        .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
        .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
        .csrf(config -> config.disable())
        .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        //este metodo se tiene que agregar para que se pueda comunicar 
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .build();
    }

    //configuracion para que pueda consumir las apis cualquier fronted
    @Bean
    CorsConfigurationSource corsConfigurationSource (){
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
        config.setAllowedHeaders(Arrays.asList("Authorization","Content-Type"));
        config.setAllowCredentials(true);

        //para configurar las rutas del backend para el fronted
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    FilterRegistrationBean <CorsFilter> corsFilter(){
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(
            new CorsFilter(corsConfigurationSource()));
            bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
            return bean;
    }
}

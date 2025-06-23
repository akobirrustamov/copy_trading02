package com.example.backend.security;

import com.example.backend.entity.BotAdmins;
import com.example.backend.repository.BotAdminsRepository;
import com.example.backend.repository.BotUsersRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.BotUsersService.BotUsersService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class MyFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepo;
    private final BotAdminsRepository adminsRepository;
    private final BotUsersRepository usersRepository;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String tokenString = request.getHeader("Authorization");
        String requestPath = request.getRequestURI();
        String method= request.getMethod();
        System.out.println(requestPath);

        if(requestPath.startsWith("/api/v1/newtraders") || requestPath.startsWith("/api/v1/ordertraders") || requestPath.startsWith("/api/v1/notification")){
            filterChain.doFilter(request, response);
            return;
        }
        if (requestPath.startsWith("/api")) {
            BigInteger token = null;
            try {
                token = new BigInteger(tokenString);
            } catch (NumberFormatException e) {
                return;
            }
            boolean userPermit = usersRepository.existsById(token);
            if (userPermit && (
                    (requestPath.contains("api/v1/userjon/traders") )
                            || (requestPath.contains("api/v1/userjon") )
                            || (requestPath.contains("api/v1/image") )
                            || (requestPath.contains("api/v1/message") )
                            || (requestPath.contains("api/v1/userjon/setting") )
            )) {
                System.out.println(2);
                filterChain.doFilter(request, response);
                return;
            }

            boolean permit = adminsRepository.existsById(token);
            if (permit) {
                System.out.println(1);
                filterChain.doFilter(request, response);
                return;
            }

        }

        filterChain.doFilter(request, response);

    }


}

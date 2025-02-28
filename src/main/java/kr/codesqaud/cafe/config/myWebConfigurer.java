package kr.codesqaud.cafe.config;

import kr.codesqaud.cafe.interceptor.LogInterceptor;
import kr.codesqaud.cafe.interceptor.LoginCheckInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class myWebConfigurer implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(0)
                .addPathPatterns("/**");

        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/qna/show/**", "/qna/createForm", "/qna/create/**", "/qna/update/**", "/reply/create");
    }
}

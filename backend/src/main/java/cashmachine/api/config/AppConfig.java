package cashmachine.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import cashmachine.api.proxy.AuthServiceProxy;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.service.AuthService;

import javax.validation.constraints.NotNull;

@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {

    @NotNull
    private String url;

    @NotNull
    @Value("${app.front.url}")
    private String frontUrl;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFrontUrl() {
        return frontUrl;
    }

    public void setFrontUrl(String frontUrl) {
        this.frontUrl = frontUrl;
    }
}

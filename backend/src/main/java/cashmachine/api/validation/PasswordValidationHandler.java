package cashmachine.api.validation;

import cashmachine.api.dto.LoginRequest;
import cashmachine.api.exception.MyRuntimeException;
import cashmachine.api.repository.UserRepository;
import cashmachine.api.model.User;
import cashmachine.api.validation.interfaces.IValidationHandler;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.regex.Pattern;

public class PasswordValidationHandler implements IValidationHandler {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    // Expressão regular para validar o formato da senha.
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$");

    // Construtor com injeção de dependências.
    public PasswordValidationHandler(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public void setNext(IValidationHandler nextHandler) {
        // Este handler não deve ter próximo handler, portanto, não faz nada aqui.
    }

    @Override
    public void handle(LoginRequest loginRequest) throws Exception {
        System.out.println("\n === PasswordValidationHandler.handle()");

        // Verificar se a senha está no formato correto.
        if (loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty())
            throw new MyRuntimeException("Senha é obrigatória");

        if (!PASSWORD_PATTERN.matcher(loginRequest.getPassword()).matches())
            throw new MyRuntimeException("Senha deve ter pelo menos 8 caracteres e incluir letras e números");

        // Buscar o usuário do banco de dados.
        Optional<User> userOptional = userRepository.findByName(loginRequest.getName());

        // Verificar se o usuário foi encontrado.
        User user = userOptional.orElseThrow(() -> new MyRuntimeException("Usuário não encontrado"));

        // Comparar a senha fornecida com a senha armazenada.
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword()))
            throw new MyRuntimeException("Senha inválida");
    }
}
package cashmachine.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import cashmachine.api.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);
    List<User> findByIdNotIn(List<Long> ids);
    boolean existsByName(String name);
    void deleteByName(String name);
}

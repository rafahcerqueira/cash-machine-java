package cashmachine.api.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import cashmachine.api.repository.MyRepository;

import java.util.List;

public interface MyEntity {

    public default List<MyRepository> returnChildRepositories(@Autowired ApplicationContext context){
        throw new UnsupportedOperationException();
    }
}
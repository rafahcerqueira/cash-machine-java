package cashmachine.api.repository;

import org.springframework.stereotype.Repository;
import cashmachine.api.model.MyEntity;

@Repository
public interface MyRepository{


    public default void deleteByParent(MyEntity parent){}


}

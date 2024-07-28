package cashmachine.api.mapper;

import cashmachine.api.dto.Dto;
import cashmachine.api.model.MyEntity;

public interface GenericMapper<D extends Dto, E extends MyEntity> {

    E toEntity(D dto);

    D toDto(E entity);
}

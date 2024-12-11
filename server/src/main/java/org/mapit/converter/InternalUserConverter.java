package org.mapit.converter;

import org.mapit.entity.InternalUser;
import org.mapit.model.CreateUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
public interface InternalUserConverter {

  @Mapping(target = "updateAt", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createAt", ignore = true)
  InternalUser create(CreateUser user);
}

package org.mapit.converter;

import org.mapit.entity.DictionaryItem;
import org.mapit.model.parameter.CreateDictionaryItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
public interface DictionaryItemConverter {

  @Mapping(target = "meta", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "delete", ignore = true)
  @Mapping(target = "updateAt", ignore = true)
  @Mapping(target = "dictionary", ignore = true)
  @Mapping(target = "createAt", ignore = true)
  DictionaryItem create(CreateDictionaryItem item);
}

package org.mapit.converter;

import org.mapit.entity.DictionaryItem;
import org.mapit.model.CreateDictionaryItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
public interface DictionaryItemConverter {

  @Mapping(target = "delete", ignore = true)
  @Mapping(target = "updateAt", ignore = true)
  @Mapping(target = "dictionary", ignore = true)
  @Mapping(target = "createAt", ignore = true)
  DictionaryItem create(CreateDictionaryItem item);
}

package org.mapit.converter;

import java.util.List;
import java.util.Set;

import org.mapit.data.structure.DictionaryWithItem;
import org.mapit.entity.Dictionary;
import org.mapit.model.CreateDictionary;
import org.mapit.schema.DictionaryCache;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.JAKARTA)
public interface DictionaryConverter {

  @Mapping(target = "meta", ignore = true)
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "project", ignore = true)
  @Mapping(target = "updateAt", ignore = true)
  @Mapping(target = "items", ignore = true)
  @Mapping(target = "delete", ignore = true)
  @Mapping(target = "createAt", ignore = true)
  Dictionary create(CreateDictionary createDictionary);

  org.mapit.data.structure.Dictionary entity2Vo(Dictionary dictionary);

  List<org.mapit.data.structure.Dictionary> entity2Vo(List<Dictionary> dictionaries);

  Set<org.mapit.data.structure.Dictionary> entity2Vo(Set<Dictionary> dictionaries);

  DictionaryWithItem entity2WithItemVo(Dictionary dictionary);

  List<DictionaryWithItem> entity2WithItemVo(List<Dictionary> dictionary);

  Set<DictionaryWithItem> entity2WithItemVo(Set<Dictionary> dictionary);

  DictionaryCache entity2Cache(Dictionary dictionary);
}

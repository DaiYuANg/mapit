package org.mapit.converter;

import java.util.List;
import java.util.Set;

import org.mapit.entity.Dictionary;
import org.mapit.model.Paged;
import org.mapit.model.parameter.CreateDictionary;
import org.mapit.model.vo.DictionaryVo;
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

  DictionaryVo entity2Vo(Dictionary dictionary);

  List<DictionaryVo> entity2Vo(List<Dictionary> dictionaries);

  Set<DictionaryVo> entity2Vo(Set<Dictionary> dictionaries);

  Paged<DictionaryVo> entity2Vo(Paged<Dictionary> dictionaries);

//  DictionaryWithItem entity2WithItemVo(Dictionary dictionary);
//
//  List<DictionaryWithItem> entity2WithItemVo(List<Dictionary> dictionary);
//
//  Set<DictionaryWithItem> entity2WithItemVo(Set<Dictionary> dictionary);

  DictionaryCache entity2Cache(Dictionary dictionary);
}

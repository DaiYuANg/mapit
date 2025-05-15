package org.mapit.service.impl;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.jetbrains.annotations.NotNull;
import org.mapit.converter.DictionaryItemConverter;
import org.mapit.exception.DictionaryNotFoundException;
import org.mapit.model.parameter.CreateDictionaryItem;
import org.mapit.repository.DictionaryItemRepository;
import org.mapit.repository.DictionaryRepository;
import org.mapit.service.DictionaryItemService;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryItemServiceImpl implements DictionaryItemService {

  private final DictionaryItemRepository dictionaryItemRepository;

  private final DictionaryRepository dictionaryRepository;

  private final DictionaryItemConverter dictionaryItemConverter;

  @Override
  public Uni<Void> create(@NotNull CreateDictionaryItem dictionaryItem) {
//    return dictionaryRepository.findById(dictionaryItem.dictionaryId())
//      .onItem()
//      .ifNull()
//      .failWith(new DictionaryNotFoundException("Dictionary not found"))
//      .map(dictionary -> {
//        val entity = dictionaryItemConverter.create(dictionaryItem);
//        entity.setDictionary(dictionary);
//        return entity;
//      })
//      .flatMap(dictionaryItemRepository::persist)
//      .replaceWithVoid();
    return null;
  }
}

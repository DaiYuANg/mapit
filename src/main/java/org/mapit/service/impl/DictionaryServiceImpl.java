package org.mapit.service.impl;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.converter.DictionaryConverter;
import org.mapit.model.CreateDictionary;
import org.mapit.repository.DictionaryRepository;
import org.mapit.service.DictionaryService;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {

  private final DictionaryConverter dictionaryConverter;

  private final DictionaryRepository dictionaryRepository;

  @Override
  public Uni<Void> createDictionary(CreateDictionary dictionary) {
    return Uni.createFrom().item(dictionaryConverter.create(dictionary))
      .flatMap(dictionaryRepository::persist)
      .replaceWithVoid();
  }
}

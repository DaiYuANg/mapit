package org.mapit.service.impl;

import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.mapit.converter.DictionaryConverter;
import org.mapit.model.CreateDictionary;
import org.mapit.repository.DictionaryRepository;
import org.mapit.repository.ProjectRepository;
import org.mapit.service.DictionaryService;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class DictionaryServiceImpl implements DictionaryService {

  private final DictionaryConverter dictionaryConverter;

  private final DictionaryRepository dictionaryRepository;

  private final ProjectRepository projectRepository;

  @Override
  @WithTransaction
  public Uni<Void> createDictionary(CreateDictionary dictionary) {
    log.atInfo().log("Create dictionary:{}", dictionary);
    return Uni.createFrom()
      .item(() -> projectRepository.findById(dictionary.projectId()))
      .onItem()
      .ifNotNull()
      .transformToUni(uniProject ->
        uniProject.log().map(project -> {
          val dict = dictionaryConverter.create(dictionary);
          dict.setProject(project);
          return dict;
        })
      )
      .flatMap(dictionaryRepository::persist)
      .replaceWithVoid();
  }
}

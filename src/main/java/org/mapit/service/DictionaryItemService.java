package org.mapit.service;

import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import org.jetbrains.annotations.NotNull;
import org.mapit.model.CreateDictionaryItem;

public interface DictionaryItemService {
  @WithTransaction
  Uni<Void> create(@NotNull CreateDictionaryItem dictionaryItem);
}

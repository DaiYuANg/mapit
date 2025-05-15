package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.jetbrains.annotations.NotNull;
import org.mapit.model.parameter.CreateDictionaryItem;

public interface DictionaryItemService {
  Uni<Void> create(@NotNull CreateDictionaryItem dictionaryItem);
}

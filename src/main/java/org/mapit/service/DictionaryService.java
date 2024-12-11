package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.CreateDictionary;

public interface DictionaryService {
  Uni<Void> createDictionary(CreateDictionary dictionary);
}

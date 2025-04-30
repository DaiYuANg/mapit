package org.mapit.service;

import io.smallrye.mutiny.Uni;
import org.mapit.model.Paged;
import org.mapit.model.parameter.CreateDictionary;
import org.mapit.model.query.DictionaryQuery;
import org.mapit.model.vo.DictionaryVo;

public interface DictionaryService {
  Uni<Paged<DictionaryVo>> page(DictionaryQuery dictionaryQuery);

  Uni<Void> createDictionary(CreateDictionary dictionary);
}

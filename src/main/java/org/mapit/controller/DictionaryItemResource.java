package org.mapit.controller;

import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.CreateDictionary;
import org.mapit.model.CreateDictionaryItem;
import org.mapit.service.DictionaryItemService;
import org.mapit.service.DictionaryService;

@Path("/api/v1/dictionary/item")
@RequiredArgsConstructor
@Slf4j
@Authenticated
public class DictionaryItemResource {

  private final DictionaryItemService dictionaryItemService;

  @POST
  public Uni<Void> create(CreateDictionaryItem item) {
    return dictionaryItemService.create(item);
  }
}

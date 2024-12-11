package org.mapit.controller;

import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.CreateDictionary;
import org.mapit.service.DictionaryService;

@Path("/api/v1/dictionary")
@RequiredArgsConstructor
@Slf4j
@Authenticated
public class DictionaryResource {

  private final DictionaryService dictionaryService;

  @POST
  public Uni<Void> create(CreateDictionary createDictionary) {
    return dictionaryService.createDictionary(createDictionary);
  }
}

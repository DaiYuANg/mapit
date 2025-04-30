package org.mapit.resource;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.Paged;
import org.mapit.model.ProjectQuery;
import org.mapit.model.parameter.CreateDictionary;
import org.mapit.model.query.DictionaryQuery;
import org.mapit.model.vo.DictionaryVo;
import org.mapit.model.vo.ProjectVo;
import org.mapit.service.DictionaryService;

@Path("/api/v1/dictionary")
@RequiredArgsConstructor
@Slf4j
//@Authenticated
public class DictionaryResource {

  private final DictionaryService dictionaryService;

  @GET
  public Uni<Paged<DictionaryVo>> list(@BeanParam DictionaryQuery query) {
    log.atInfo().log("Param:{}", query);
    return dictionaryService.page(query);
  }


  @POST
  public Uni<Void> create(CreateDictionary createDictionary) {
    return dictionaryService.createDictionary(createDictionary);
  }
}

package org.mapit.resource;

import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.parameter.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;
import org.mapit.model.pojo.DictItem;
import org.mapit.service.ExternalService;

@Path("/api/v1/")
@RequiredArgsConstructor
@Slf4j
public class ExternalResource {

  private final ExternalService externalService;

  @POST
  @Path("/verify")
  public Uni<VerifyAccessKeyResult> verifyAccessKey(GetAccessToken getAccessToken) {
    return externalService.verifyAccessKey(getAccessToken);
  }

  @Path("/dict/{type}/{code}")
  @GET
  public Uni<DictItem> getDict(
    @PathParam("type") String type,
    @PathParam("code") String code
  ) {
//    return Uni.createFrom().item(new DictItem());
    return null;
  }
}

package org.mapit.controller;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mapit.model.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;
import org.mapit.service.ExternalService;

@Path("/api/v1/external")
@RequiredArgsConstructor
@Slf4j
public class ExternalResource {

  private final ExternalService externalService;

  @POST
  public Uni<VerifyAccessKeyResult> verifyAccessKey(GetAccessToken getAccessToken) {
    return externalService.verifyAccessKey(getAccessToken);
  }
}

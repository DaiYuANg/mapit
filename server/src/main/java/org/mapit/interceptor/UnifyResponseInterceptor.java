package org.mapit.interceptor;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.jetbrains.annotations.NotNull;
import org.mapit.model.Result;
import org.mapit.model.ResultBuilder;

@Provider
@Slf4j
@SuppressWarnings("unused")
public class UnifyResponseInterceptor implements ContainerResponseFilter {
  @Override
  public void filter(@NotNull ContainerRequestContext containerRequestContext, @NotNull ContainerResponseContext containerResponseContext) {
    log.atTrace().log("response entity:{}", containerResponseContext.getEntity());
    log.atTrace().log("Has Entity:{}", containerResponseContext.hasEntity());

    if (containerResponseContext.hasEntity() && containerResponseContext.getEntity() instanceof Result) {
      return;
    }

    if (containerResponseContext.hasEntity()) {
      val entity = ResultBuilder.Result(String.valueOf(Response.Status.OK.getStatusCode()), "00000", containerResponseContext.getEntity());
      containerResponseContext.setEntity(entity);
    } else {
      log.atTrace().log("Default Response");
      containerResponseContext.setEntity(Result.normal());
      containerResponseContext.setStatusInfo(Response.Status.OK);
    }
  }
}
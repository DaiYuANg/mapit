package org.mapit.interceptor;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.ext.Provider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;

@Provider
@Slf4j
@RequiredArgsConstructor
public class UserAgentRecorder implements ContainerRequestFilter {

  @Override
  public void filter(@NotNull ContainerRequestContext containerRequestContext) throws IOException {
    val useragent = containerRequestContext.getHeaderString(HttpHeaders.USER_AGENT);
    log.atInfo().log("UserAgent:{}", useragent);
  }
}

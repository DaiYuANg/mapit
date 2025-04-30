package org.mapit.service.impl;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.mapit.exception.AccessKeyNotFoundException;
import org.mapit.model.parameter.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;
import org.mapit.model.VerifyAccessKeyResultBuilder;
import org.mapit.repository.ProjectQueries;
import org.mapit.service.ExternalService;
import org.mapit.util.JwtBuilderHelper;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class ExternalServiceImpl implements ExternalService {

  private final ProjectQueries projectQueries;

  private final JwtBuilderHelper jwtBuilderHelper;

  @Override
  public Uni<VerifyAccessKeyResult> verifyAccessKey(@NotNull GetAccessToken getAccessToken) {
    return projectQueries
      .findProjectByIdAndAccessKey(getAccessToken.projectId(), getAccessToken.accessKey())
      .onItem()
      .ifNull()
      .failWith(new AccessKeyNotFoundException("Invalid access key"))
      .map(project -> jwtBuilderHelper.buildJwt())
      .map(
        jwt -> VerifyAccessKeyResultBuilder.builder().accessToken(jwt).build()
      );
  }
}

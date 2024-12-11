package org.mapit.service.impl;

import io.smallrye.jwt.build.impl.JwtBuildUtils;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.mapit.exception.AccessKeyNotFoundException;
import org.mapit.model.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;
import org.mapit.model.VerifyAccessKeyResultBuilder;
import org.mapit.repository.ProjectQueryRepository;
import org.mapit.service.ExternalService;
import org.mapit.util.JwtBuilderHelper;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class ExternalServiceImpl implements ExternalService {

  private final ProjectQueryRepository projectQueryRepository;

  private final JwtBuilderHelper jwtBuilderHelper;

  @Override
  public Uni<VerifyAccessKeyResult> verifyAccessKey(@NotNull GetAccessToken getAccessToken) {
    return projectQueryRepository.findProjectByAccessKey(getAccessToken.accessKey())
      .onItem()
      .ifNull()
      .failWith(new AccessKeyNotFoundException("Invalid access key"))
      .map(project -> VerifyAccessKeyResultBuilder.builder().build());
  }
}

package org.mapit.service.impl;

import io.quarkus.cache.CacheResult;
import io.quarkus.hibernate.reactive.panache.common.WithSession;
import io.quarkus.hibernate.reactive.panache.common.WithTransaction;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.mapit.exception.AccessKeyNotFoundException;
import org.mapit.model.parameter.GetAccessToken;
import org.mapit.model.VerifyAccessKeyResult;
import org.mapit.model.VerifyAccessKeyResultBuilder;
import org.mapit.model.pojo.DictItem;
import org.mapit.model.pojo.DictItemBuilder;
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
  @WithSession
  public Uni<VerifyAccessKeyResult> verifyAccessKey(@NotNull GetAccessToken getAccessToken) {
    log.atInfo().log("TOKEN:{}", getAccessToken);
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

  public Uni<DictItem> getItem(String key, String code) {
    return Uni.createFrom().item(DictItemBuilder.builder().build());
  }
}

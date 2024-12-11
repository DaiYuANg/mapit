package org.mapit.service.impl;

import io.smallrye.jwt.build.Jwt;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.apache.commons.lang3.time.DateUtils;
import org.mapit.config.MapitConfig;
import org.mapit.model.LoginParameter;
import org.mapit.model.LoginResult;
import org.mapit.model.LoginResultBuilder;
import org.mapit.repository.UserRepository;
import org.mapit.service.AuthService;
import org.mapit.util.JwtBuilderHelper;

import java.util.Date;

import static io.smallrye.mutiny.Uni.createFrom;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserRepository userMoreRepository;

  private final MapitConfig mapitConfig;

  private final JwtBuilderHelper jwtBuilderHelper;

  @Override
  public Uni<LoginResult> login(LoginParameter loginParameter) {
    val jwt = jwtBuilderHelper.buildJwt();
    log.atInfo().log("Config:{}", mapitConfig.username());
    log.atInfo().log("Config:{}", mapitConfig.password());
    log.atInfo().log("Auth Request{}", loginParameter);
    return createFrom().item(LoginResultBuilder.builder()
      .token(jwt)
      .build());
  }
}

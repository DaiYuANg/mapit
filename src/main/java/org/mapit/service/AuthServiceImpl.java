package org.mapit.service;

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

import java.util.Date;

import static io.smallrye.mutiny.Uni.createFrom;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final UserRepository userMoreRepository;

  private final MapitConfig mapitConfig;

  @Override
  public Uni<LoginResult> login(LoginParameter loginParameter) {
    val jwt = Jwt.issuer("https://api.mapit.com")
      .upn(mapitConfig.username())
      .expiresAt(DateUtils.addDays(new Date(), 10).getTime())
      .sign();
    log.atInfo().log("Config:{}", mapitConfig.username());
    log.atInfo().log("Config:{}", mapitConfig.password());
    log.atInfo().log("Auth Request{}", loginParameter);
    return createFrom().item(LoginResultBuilder.builder()
      .token(jwt)
      .build());
  }
}

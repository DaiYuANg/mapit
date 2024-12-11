package org.mapit.service.impl;

import static io.smallrye.mutiny.Uni.createFrom;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.mapit.config.MapitConfig;
import org.mapit.converter.InternalUserConverter;
import org.mapit.model.CreateUser;
import org.mapit.model.LoginParameter;
import org.mapit.model.LoginResult;
import org.mapit.model.LoginResultBuilder;
import org.mapit.repository.UserRepository;
import org.mapit.service.AuthService;
import org.mapit.util.JwtBuilderHelper;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final MapitConfig mapitConfig;

  private final InternalUserConverter internalUserConverter;

  private final UserRepository userRepository;

  private final JwtBuilderHelper jwtBuilderHelper;

  @Override
  public Uni<Void> registerUser(CreateUser createUser) {
    return Uni.createFrom().item(internalUserConverter.create(createUser)).map(userRepository::persist).replaceWithVoid();
  }

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

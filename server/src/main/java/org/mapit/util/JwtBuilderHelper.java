package org.mapit.util;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.time.DateUtils;
import org.mapit.config.MapitConfig;

@ApplicationScoped
@RequiredArgsConstructor
@Slf4j
public class JwtBuilderHelper {
  private final MapitConfig mapitConfig;

  public String buildJwt() {
    return Jwt.issuer(mapitConfig.externalUrl())
      .upn(mapitConfig.username())
      .expiresAt(DateUtils.addDays(new Date(), 10).getTime())
      .sign();
  }
}

package org.mapit.config;

import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;
import io.smallrye.config.WithName;

@ConfigMapping(prefix = "mapit")
public interface MapitConfig {

  @WithName("external.url")
  @WithDefault("http://localhost")
  String externalUrl();

  @WithName("admin.username")
  String username();

  @WithName("admin.password")
  String password();
}
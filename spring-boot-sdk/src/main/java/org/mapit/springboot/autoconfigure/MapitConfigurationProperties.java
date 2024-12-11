package org.mapit.springboot.autoconfigure;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mapit")
@Getter
@Setter
public class MapitConfigurationProperties {
  private String serverUrl;
  private String projectAccessKey;
}

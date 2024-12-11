package org.mapit.springboot.autoconfigure;

import lombok.RequiredArgsConstructor;
import lombok.val;
import org.mapit.springboot.http.MapitRequestAPI;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@AutoConfiguration
@EnableConfigurationProperties(MapitConfigurationProperties.class)
@RequiredArgsConstructor
public class MapitAutoConfigure {

  private final MapitConfigurationProperties mapitConfigurationProperties;

  @Bean("MapitRestClient")
  RestClient restClient() {
    return RestClient.builder()
      .baseUrl(mapitConfigurationProperties.getServerUrl())
      .build();
  }

  @Bean("MapitRequestAPI")
  MapitRequestAPI mapitRequestAPI(RestClient restClient) {
    val adapter = RestClientAdapter.create(restClient);
    val factory = HttpServiceProxyFactory.builderFor(adapter).build();
    return factory.createClient(MapitRequestAPI.class);
  }
}

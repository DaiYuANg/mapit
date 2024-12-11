package org.mapit.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import io.quarkus.jackson.ObjectMapperCustomizer;
import jakarta.inject.Singleton;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;

@Singleton
@RequiredArgsConstructor
public class JacksonCustomizer implements ObjectMapperCustomizer {

  private final JacksonLong2StringModule long2StringModule;

  @Override
  public void customize(@NotNull ObjectMapper objectMapper) {
    objectMapper.registerModules(new ParameterNamesModule());
    objectMapper.registerModules(long2StringModule);
    objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
    objectMapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
  }
}

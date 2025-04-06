package org.mapit.config;

import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class JacksonLong2StringModule extends SimpleModule {
  public JacksonLong2StringModule() {
    addSerializer(Long.class, ToStringSerializer.instance);
    addSerializer(Long.TYPE, ToStringSerializer.instance);
  }
}
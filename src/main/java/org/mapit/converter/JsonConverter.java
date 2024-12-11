package org.mapit.converter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.SneakyThrows;

import java.util.Map;

@Converter
public class JsonConverter implements AttributeConverter<Map<String, Object>, String> {
  private final ObjectMapper mapper = new ObjectMapper();

  @SneakyThrows
  @Override
  public String convertToDatabaseColumn(Map<String, Object> stringObjectMap) {
    return mapper.writeValueAsString(stringObjectMap);
  }

  @SneakyThrows
  @Override
  public Map<String, Object> convertToEntityAttribute(String s) {
    return mapper.readValue(s, new TypeReference<Map<String, Object>>() {
    });
  }
}

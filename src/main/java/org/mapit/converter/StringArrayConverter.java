package org.mapit.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.jetbrains.annotations.NotNull;

@Converter()
public class StringArrayConverter implements AttributeConverter<String[], String> {
  @Override
  public String convertToDatabaseColumn(String[] strings) {
    return String.join(",", strings);
  }

  @Override
  public String[] convertToEntityAttribute(@NotNull String s) {
    return s.split(",");
  }
}

package org.mapit.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.jetbrains.annotations.NotNull;
import org.mapit.constant.ProjectType;

import java.util.Arrays;
import java.util.Map;

@Converter
public class ProjectTypeConverter implements AttributeConverter<ProjectType, Integer> {
  @Override
  public Integer convertToDatabaseColumn(@NotNull ProjectType projectType) {
    return projectType.getTypeCode();
  }

  @Override
  public ProjectType convertToEntityAttribute(Integer integer) {
    return Arrays
      .stream(ProjectType.values())
      .filter(type -> type.getTypeCode().equals(integer))
      .findFirst()
      .orElse(null);
  }
}

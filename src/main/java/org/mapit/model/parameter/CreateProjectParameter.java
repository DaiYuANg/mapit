package org.mapit.model.parameter;

import io.soabase.recordbuilder.core.RecordBuilder;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@RecordBuilder
public record CreateProjectParameter(
  @Schema(description = "project name")
  String name,
  String description
) {
}

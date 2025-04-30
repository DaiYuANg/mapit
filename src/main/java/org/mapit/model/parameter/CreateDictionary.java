package org.mapit.model.parameter;

import io.soabase.recordbuilder.core.RecordBuilder;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

@RecordBuilder
@Schema(description = "Create Dictionary")
public record CreateDictionary(

  @Schema(description = "Project id")
  Long projectId,

  @Schema(description = "Dictionary name")
  String name,

  @Schema(description = "Dictionary key")
  String key,

  @Schema(description = "Dictionary desc")
  String description,

  @Schema(description = "Dictionary remark")
  String remark
) {
}

package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;
import java.util.Date;

import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.infinispan.protostream.annotations.Proto;

@RecordBuilder
@Proto
@Schema(description = "Project")
public record ProjectVo(

  @Schema(description = "Project id")
  Long id,
  @Schema(description = "Project name")
  String name,
  @Schema(description = "project desc")
  String description,

  String accessKey,
  Date createAt
) {
}

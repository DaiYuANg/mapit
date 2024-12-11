package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record CreateDictionary(
  Long projectId,
  String name,

  String key,

  String description,

  String remark
) {
}

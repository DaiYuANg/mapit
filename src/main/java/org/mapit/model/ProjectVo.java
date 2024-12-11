package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record ProjectVo(
  Long id,
  String name,
  String description,
  String accessToken
) {
}

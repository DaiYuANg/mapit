package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record LoginParameter(
  String username,
  String password
) {
}

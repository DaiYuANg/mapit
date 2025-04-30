package org.mapit.model.parameter;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record LoginParameter(
  String username,
  String password
) {
}

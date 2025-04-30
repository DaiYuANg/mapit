package org.mapit.model.parameter;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record LoginResult(
  String token
) {
}

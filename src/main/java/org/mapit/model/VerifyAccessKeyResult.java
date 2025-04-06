package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record VerifyAccessKeyResult(
  String accessToken
) {
}

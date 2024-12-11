package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record CreateUser(
  String username,
  String password
) {
}

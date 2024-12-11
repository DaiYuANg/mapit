package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record CreateDictionaryItem(
  Long dictionaryId,
  String name,
  String value,
  String description,
  String remark
) {
}

package org.mapit.model.parameter;

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

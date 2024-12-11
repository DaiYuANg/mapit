package org.mapit.data.structure;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record DictionaryItem(
  String name,
  String value,
  String description,
  String remark
) {
}

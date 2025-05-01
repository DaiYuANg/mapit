package org.mapit.model.pojo;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record DictItem(
  String code,
  String name,
  String value
) {
}

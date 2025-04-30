package org.mapit.model.vo;

import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder
public record DictionaryVo(
  String name,
  String key,
  String description,
  String remark) {
}

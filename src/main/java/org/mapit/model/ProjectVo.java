package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;
import org.infinispan.protostream.annotations.Proto;

import java.util.Date;

@RecordBuilder
@Proto
public record ProjectVo(
  Long id,
  String name,
  String description,
  String accessKey,
  Date createAt
) {
}

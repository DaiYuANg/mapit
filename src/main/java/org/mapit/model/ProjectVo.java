package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;
import java.util.Date;
import org.infinispan.protostream.annotations.Proto;

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

package org.mapit.model.parameter;

import io.soabase.recordbuilder.core.RecordBuilder;
import org.infinispan.protostream.annotations.Proto;

@RecordBuilder
@Proto
public record GetAccessToken(
  Long projectId,
  String accessKey
) {
}

package org.mapit.model;

import io.soabase.recordbuilder.core.RecordBuilder;
import org.infinispan.protostream.annotations.Proto;

@RecordBuilder
@Proto
public record VerifyAccessKeyResult(
  String accessToken
) {
}

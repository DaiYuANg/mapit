package org.mapit.schema;

import org.infinispan.protostream.annotations.Proto;

@Proto
public record DictionaryCache(
  Long id,
  String name,

  String key,

  String description,

  String remark
) {
}

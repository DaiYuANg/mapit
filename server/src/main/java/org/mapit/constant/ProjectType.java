package org.mapit.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ProjectType {
  OWNED(1),

  SHARED(2);

  private final Integer typeCode;
}

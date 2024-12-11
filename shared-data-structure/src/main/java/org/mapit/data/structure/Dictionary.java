package org.mapit.data.structure;


import lombok.experimental.SuperBuilder;
import lombok.extern.jackson.Jacksonized;

@SuperBuilder
@Jacksonized
public class Dictionary {
  String name;
  String key;
  String description;
  String remark;
}

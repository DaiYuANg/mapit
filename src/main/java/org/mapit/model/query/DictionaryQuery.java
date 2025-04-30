package org.mapit.model.query;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@EqualsAndHashCode(callSuper = true)
@Data
@ToString(callSuper = true)
public class DictionaryQuery extends PageQuery {
  private String name;
}

package org.mapit.data.structure;


import lombok.experimental.SuperBuilder;
import lombok.extern.jackson.Jacksonized;

import java.util.Set;

@SuperBuilder
@Jacksonized
public class DictionaryWithItem extends Dictionary {
  private Set<DictionaryItem> items;
}

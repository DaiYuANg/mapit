package org.mapit.data.structure;


import java.util.Set;
import lombok.experimental.SuperBuilder;
import lombok.extern.jackson.Jacksonized;

@SuperBuilder
@Jacksonized
public class DictionaryWithItem extends Dictionary {
  private Set<DictionaryItem> items;
}

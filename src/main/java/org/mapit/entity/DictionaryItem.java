package org.mapit.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class DictionaryItem extends BaseEntity {

  @Column
  private String name;

  @Column
  private String value;

  @ManyToOne
  private Dictionary dictionary;
}

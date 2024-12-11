package org.mapit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SoftDelete;

import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Dictionary extends BaseEntity {
  private String name;

  private String key;

  private String description;

  private String remark;

  @SoftDelete
  private Boolean delete;

  @OneToMany
  private Set<DictionaryItem> items;
}

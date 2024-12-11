package org.mapit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.SoftDelete;
import org.mapit.constant.TableNaming;
import org.mapit.converter.JsonConverter;

import java.util.Map;
import java.util.Set;

@Entity
@Table(name = TableNaming.DICTIONARY)
@Getter
@Setter
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Dictionary extends BaseEntity {

  @Column
  private String name;

  @Column
  private String key;

  @Column
  private String description;

  @Column
  private String remark;

  @SoftDelete
  private Boolean delete;

  @OneToMany
  private Set<DictionaryItem> items;

  @ManyToOne
  private Project project;

  @Convert(converter = JsonConverter.class)
  @Column(columnDefinition = "json")
  private Map<String, Object> meta;
}
